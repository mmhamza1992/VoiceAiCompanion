"""
API endpoints for managing bookings
This module provides server-side endpoints for creating and managing bookings,
bypassing Supabase Row-Level Security (RLS) by using direct database access.
"""
import json
import psycopg2
import psycopg2.extras
from datetime import datetime
from flask import Blueprint, request, jsonify
from db_utils import get_db_connection
from flask_cors import CORS

bookings_api = Blueprint('bookings_endpoints', __name__)
CORS(bookings_api)

@bookings_api.route('/bookings', methods=['POST'])
def create_booking():
    """Create a new booking record bypassing Supabase RLS"""
    conn = None
    try:
        data = request.json
        
        # Check required fields
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Get database connection
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Prepare data for insertion
        package_name = data.get('package', '')
        
        # Handle Arabic package name mappings
        package_mappings = {
            'custom-wakel': 'وكيل مخصص',
            'wakel-clinic': 'وكيل للعيادات الطبية',
            'wakel-lawyer': 'وكيل للمكاتب القانونية',
            'wakel-cold-call': 'وكيل للاتصالات التسويقية',
            'basic': 'وكيل أساسي',
            'medium': 'وكيل متوسط',
            'advanced': 'وكيل متقدم'
        }
        
        if package_name in package_mappings:
            package_name = package_mappings[package_name]
            
        booking_data = {
            'invitee_name': data.get('invitee_name', ''),
            'invitee_email': data.get('invitee_email', ''),
            'company': data.get('company', ''),
            'phone': data.get('phone', ''),
            'package': package_name,
            'status': data.get('status', 'scheduled'),
            'user_id': data.get('user_id', 'anonymous'),
            'event_type_id': data.get('event_type_id'),
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        
        # Store the full data including service_type in the details JSON field
        details = data.get('details', {})
        if not details:
            # If no details were provided, create a basic details object
            details = {
                'service_type': data.get('service_type', 'wakel'),
                'preferred_date': data.get('preferred_date', ''),
                'preferred_time': data.get('preferred_time', '')
            }
        booking_data['details'] = json.dumps(details)
        
        # Build SQL query
        columns = ', '.join(booking_data.keys())
        placeholders = ', '.join(['%s'] * len(booking_data))
        
        query = f"""
            INSERT INTO bookings ({columns})
            VALUES ({placeholders})
            RETURNING id;
        """
        
        # Execute query
        cursor.execute(query, list(booking_data.values()))
        result = cursor.fetchone()
        booking_id = result[0] if result else None
        
        # Commit transaction
        conn.commit()
        
        return jsonify({
            "success": True,
            "booking_id": booking_id,
            "message": "Booking created successfully"
        }), 201
        
    except Exception as e:
        # Log the error
        print(f"Error creating booking: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Close database connection
        if conn is not None:
            conn.close()

@bookings_api.route('/bookings/<int:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    """Update an existing booking"""
    conn = None
    try:
        data = request.json
        
        # Get database connection
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Could not connect to database"}), 500
            
        cursor = conn.cursor()
        
        # Build update query dynamically
        update_fields = []
        values = []
        
        if data is not None:
            for key, value in data.items():
                # Handle special case for details which should be JSON
                if key == 'details' and isinstance(value, dict):
                    update_fields.append(f"{key} = %s")
                    values.append(json.dumps(value))
                else:
                    update_fields.append(f"{key} = %s")
                    values.append(value)
        
        # Add booking ID and updated_at
        values.append(datetime.now())
        values.append(booking_id)
        
        query = f"""
            UPDATE bookings 
            SET {', '.join(update_fields)}, updated_at = %s
            WHERE id = %s
            RETURNING id;
        """
        
        # Execute query
        cursor.execute(query, values)
        result = cursor.fetchone()
        updated_id = result[0] if result else None
        
        if not updated_id:
            return jsonify({"error": "Booking not found"}), 404
        
        # Commit transaction
        conn.commit()
        
        return jsonify({
            "success": True,
            "booking_id": updated_id,
            "message": "Booking updated successfully"
        })
        
    except Exception as e:
        # Log the error
        print(f"Error updating booking: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Close database connection
        if conn is not None:
            conn.close()

@bookings_api.route('/bookings', methods=['GET'])
def get_bookings():
    """Get all bookings or filter by email/phone"""
    conn = None
    try:
        # Get query parameters
        email = request.args.get('email')
        phone = request.args.get('phone')
        
        # Get database connection
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Could not connect to database"}), 500
            
        cursor = conn.cursor()
        
        # Base query - note that service_type is stored in the details JSON
        query = """
            SELECT id, invitee_name, invitee_email, company, phone, 
                   package, status, user_id, event_type_id,
                   details, created_at, updated_at
            FROM bookings
        """
        
        params = []
        
        # Add filters if specified
        if email and phone:
            query += " WHERE invitee_email = %s OR phone = %s"
            params.extend([email, phone])
        elif email:
            query += " WHERE invitee_email = %s"
            params.append(email)
        elif phone:
            query += " WHERE phone = %s"
            params.append(phone)
        
        # Add ordering
        query += " ORDER BY created_at DESC"
        
        # Execute query
        cursor.execute(query, params)
        rows = cursor.fetchall()
        
        # Process results
        bookings = []
        for row in rows:
            if row is None:
                continue
                
            # Debug log the row
            print(f"Processing row: {row}")
            
            # Parse details JSON if available
            details = {}
            if len(row) > 9 and row[9] is not None:
                try:
                    if isinstance(row[9], str):
                        details = json.loads(row[9])
                    elif isinstance(row[9], dict):
                        details = row[9]
                except Exception as e:
                    print(f"Error parsing details: {e}")
            
            # Format dates
            created_at = row[10].isoformat() if len(row) > 10 and row[10] is not None else None
            updated_at = row[11].isoformat() if len(row) > 11 and row[11] is not None else None
            
            # Get service_type from details if available
            service_type = 'wakel'
            if details and isinstance(details, dict):
                service_type = details.get('service_type', 'wakel')
                
            # Create booking object with safe indexing
            booking_data = {
                "id": row[0] if len(row) > 0 else None,
                "invitee_name": row[1] if len(row) > 1 else "",
                "invitee_email": row[2] if len(row) > 2 else "",
                "company": row[3] if len(row) > 3 else "",
                "phone": row[4] if len(row) > 4 else "",
                "package": row[5] if len(row) > 5 else "",
                "status": row[6] if len(row) > 6 else "pending",
                "user_id": row[7] if len(row) > 7 else None,
                "event_type_id": row[8] if len(row) > 8 else None,
                "details": details,
                "service_type": service_type,  # Add service_type from details for backward compatibility
                "created_at": created_at,
                "updated_at": updated_at
            }
            
            bookings.append(booking_data)
        
        return jsonify({
            "success": True,
            "count": len(bookings),
            "bookings": bookings
        })
        
    except Exception as e:
        # Log the error
        print(f"Error retrieving bookings: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Close database connection
        if conn is not None:
            conn.close()

@bookings_api.route('/bookings/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    """Get a specific booking by ID"""
    conn = None
    try:
        # Get database connection
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Could not connect to database"}), 500
            
        cursor = conn.cursor()
        
        # Query for the specific booking
        query = """
            SELECT id, invitee_name, invitee_email, company, phone, 
                   package, status, user_id, event_type_id,
                   details, created_at, updated_at
            FROM bookings
            WHERE id = %s
        """
        
        # Execute query
        cursor.execute(query, [booking_id])
        row = cursor.fetchone()
        
        if not row:
            return jsonify({"error": "Booking not found"}), 404
        
        # Debug log the row
        print(f"Processing booking row: {row}")
        
        # Parse details JSON if available
        details = {}
        if len(row) > 9 and row[9] is not None:
            try:
                if isinstance(row[9], str):
                    details = json.loads(row[9])
                elif isinstance(row[9], dict):
                    details = row[9]
            except Exception as e:
                print(f"Error parsing details: {e}")
        
        # Format dates
        created_at = row[10].isoformat() if len(row) > 10 and row[10] is not None else None
        updated_at = row[11].isoformat() if len(row) > 11 and row[11] is not None else None
        
        # Get service_type from details if available
        service_type = 'wakel'
        if details and isinstance(details, dict):
            service_type = details.get('service_type', 'wakel')
            
        # Create booking object with safe indexing
        booking = {
            "id": row[0] if len(row) > 0 else None,
            "invitee_name": row[1] if len(row) > 1 else "",
            "invitee_email": row[2] if len(row) > 2 else "",
            "company": row[3] if len(row) > 3 else "",
            "phone": row[4] if len(row) > 4 else "",
            "package": row[5] if len(row) > 5 else "",
            "status": row[6] if len(row) > 6 else "pending",
            "user_id": row[7] if len(row) > 7 else None,
            "event_type_id": row[8] if len(row) > 8 else None,
            "details": details,
            "service_type": service_type,  # Add service_type from details for backward compatibility
            "created_at": created_at,
            "updated_at": updated_at
        }
        
        return jsonify({
            "success": True,
            "booking": booking
        })
        
    except Exception as e:
        # Log the error
        print(f"Error retrieving booking: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Close database connection
        if conn is not None:
            conn.close()