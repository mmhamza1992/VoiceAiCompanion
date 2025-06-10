import os
from flask import Blueprint, request, jsonify, session
from db_utils import get_db_connection, get_user_by_email, create_user, update_user
from werkzeug.security import generate_password_hash, check_password_hash
import re
import uuid

# Create blueprint
users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/', methods=['GET'])
def get_users():
    """Get all users (admin only)"""
    # Check if user is authenticated and is admin
    user = session.get('user')
    if not user or not user.get('is_admin'):
        return jsonify({"error": "Unauthorized. Admin access required."}), 403
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT id, username, email, full_name, company, phone, is_active, created_at
            FROM users
            ORDER BY id
        """)
        
        users = []
        for row in cursor.fetchall():
            users.append({
                "id": row[0],
                "username": row[1],
                "email": row[2],
                "fullName": row[3],
                "company": row[4],
                "phone": row[5],
                "isActive": row[6],
                "createdAt": row[7].isoformat() if row[7] else None
            })
        
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": f"Failed to get users: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user"""
    # Check if user is authenticated and has access
    session_user = session.get('user')
    if not session_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    # Allow users to access only their own data, unless they're admin
    if str(session_user.get('id')) != str(user_id) and not session_user.get('is_admin'):
        return jsonify({"error": "Unauthorized. You can only access your own user data."}), 403
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT id, username, email, full_name, company, phone, 
                   profile_picture, auth_provider, is_active, created_at
            FROM users
            WHERE id = %s
        """, (user_id,))
        
        row = cursor.fetchone()
        if not row:
            return jsonify({"error": f"User not found: {user_id}"}), 404
        
        user = {
            "id": row[0],
            "username": row[1],
            "email": row[2],
            "fullName": row[3],
            "company": row[4],
            "phone": row[5],
            "profilePicture": row[6],
            "authProvider": row[7],
            "isActive": row[8],
            "createdAt": row[9].isoformat() if row[9] else None
        }
        
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": f"Failed to get user: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@users_bp.route('/', methods=['POST'])
def create_new_user():
    """Create a new user"""
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Validate required fields
    required_fields = ["email", "username", "password"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Validate email format
    if not re.match(r"[^@]+@[^@]+\.[^@]+", data["email"]):
        return jsonify({"error": "Invalid email format"}), 400
    
    # Check if email already exists
    existing_user = get_user_by_email(data["email"])
    if existing_user:
        return jsonify({"error": "Email already registered"}), 409
    
    # Hash the password
    hashed_password = generate_password_hash(data["password"])
    
    # Prepare user data
    user_data = {
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password,
        "full_name": data.get("fullName", ""),
        "company": data.get("company", ""),
        "phone": data.get("phone", ""),
        "auth_provider": "email",
        "is_active": True
    }
    
    try:
        # Create the user
        user = create_user(user_data)
        
        # Return the created user without sensitive fields
        return jsonify({
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "fullName": user["full_name"],
            "message": "User created successfully"
        }), 201
    except Exception as e:
        return jsonify({"error": f"Failed to create user: {str(e)}"}), 500

@users_bp.route('/<int:user_id>', methods=['PUT'])
def update_user_data(user_id):
    """Update an existing user"""
    # Check if user is authenticated and has access
    session_user = session.get('user')
    if not session_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    # Allow users to update only their own data, unless they're admin
    if str(session_user.get('id')) != str(user_id) and not session_user.get('is_admin'):
        return jsonify({"error": "Unauthorized. You can only update your own user data."}), 403
    
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Prepare update data
    update_data = {}
    
    if "fullName" in data:
        update_data["full_name"] = data["fullName"]
    
    if "company" in data:
        update_data["company"] = data["company"]
    
    if "phone" in data:
        update_data["phone"] = data["phone"]
    
    if "profilePicture" in data:
        update_data["profile_picture"] = data["profilePicture"]
    
    # Only admin can change these fields
    if session_user.get('is_admin'):
        if "isActive" in data:
            update_data["is_active"] = data["isActive"]
        
        if "username" in data:
            update_data["username"] = data["username"]
    
    # Handle password update
    if "password" in data and data["password"]:
        update_data["password"] = generate_password_hash(data["password"])
    
    if not update_data:
        return jsonify({"error": "No fields to update"}), 400
    
    try:
        # Update the user
        updated_user = update_user(user_id, update_data)
        if not updated_user:
            return jsonify({"error": f"User not found: {user_id}"}), 404
        
        return jsonify({
            "id": updated_user["id"],
            "username": updated_user["username"],
            "email": updated_user["email"],
            "fullName": updated_user["full_name"],
            "message": "User updated successfully"
        })
    except Exception as e:
        return jsonify({"error": f"Failed to update user: {str(e)}"}), 500

@users_bp.route('/<int:user_id>/usage-stats', methods=['GET'])
def get_user_usage_stats(user_id):
    """Get usage statistics for a user"""
    # Check if user is authenticated and has access
    session_user = session.get('user')
    if not session_user:
        return jsonify({"error": "Unauthorized"}), 401
    
    # Allow users to access only their own stats, unless they're admin
    if str(session_user.get('id')) != str(user_id) and not session_user.get('is_admin'):
        return jsonify({"error": "Unauthorized. You can only access your own usage statistics."}), 403
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Get active subscription plan tier
        cursor.execute("""
            SELECT plan_tier
            FROM subscriptions
            WHERE user_id = %s AND status = 'active'
            ORDER BY created_at DESC
            LIMIT 1
        """, (user_id,))
        
        subscription_row = cursor.fetchone()
        plan_tier = subscription_row[0] if subscription_row else None
        
        # Determine total allowed minutes based on plan tier
        total_minutes = 0
        if plan_tier == "starter":
            total_minutes = 100
        elif plan_tier == "standard":
            total_minutes = 500
        elif plan_tier == "pro":
            total_minutes = 1000
        
        # Get minutes used in the current billing cycle
        cursor.execute("""
            SELECT COALESCE(SUM(call_duration_seconds) / 60, 0) as minutes_used
            FROM call_records
            WHERE user_id = %s
              AND created_at > CURRENT_DATE - INTERVAL '30 days'
        """, (user_id,))
        
        minutes_used_row = cursor.fetchone()
        minutes_used = round(float(minutes_used_row[0])) if minutes_used_row else 0
        
        # Get total calls handled
        cursor.execute("""
            SELECT COUNT(*)
            FROM call_records
            WHERE user_id = %s
        """, (user_id,))
        
        calls_handled_row = cursor.fetchone()
        calls_handled = calls_handled_row[0] if calls_handled_row else 0
        
        # Get calls analyzed (with analysis data)
        cursor.execute("""
            SELECT COUNT(*)
            FROM call_records
            WHERE user_id = %s AND analysis_data IS NOT NULL
        """, (user_id,))
        
        calls_analyzed_row = cursor.fetchone()
        calls_analyzed = calls_analyzed_row[0] if calls_analyzed_row else 0
        
        return jsonify({
            "userId": user_id,
            "planTier": plan_tier,
            "minutesUsed": minutes_used,
            "minutesTotal": total_minutes,
            "callsHandled": calls_handled,
            "callsAnalyzed": calls_analyzed
        })
    except Exception as e:
        return jsonify({"error": f"Failed to get usage statistics: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@users_bp.route('/me', methods=['GET'])
def get_current_user_profile():
    """Get the profile of the current authenticated user"""
    user = session.get('user')
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = user.get('id')
    
    # Redirect to the user endpoint to get full profile
    return get_user(user_id)