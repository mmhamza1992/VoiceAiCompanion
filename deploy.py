#!/usr/bin/env python3
"""
Deployment script for Hugging Face Spaces
"""

import os
import subprocess
import sys

def main():
    print("🚀 Deploying Car Import Website to Hugging Face Spaces...")
    
    # Build the project
    print("📦 Building the project...")
    result = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
    
    if result.returncode != 0:
        print("❌ Build failed!")
        print(result.stderr)
        return False
    
    print("✅ Build successful!")
    
    # Check if dist folder exists
    if not os.path.exists("dist"):
        print("❌ dist folder not found!")
        return False
    
    print("📁 dist folder created successfully")
    print("🎉 Ready for Hugging Face Spaces deployment!")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)