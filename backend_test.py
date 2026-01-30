import requests
import sys
from datetime import datetime

class SimpleAPITester:
    def __init__(self, base_url="https://heart-to-harika.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        print(f"   Response: {response.json()}")
                    except:
                        print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("=== Testing Backend Health Endpoints ===")
        
        # Test root endpoint
        self.run_test("Root Endpoint", "GET", "api/", 200)
        
        # Test status endpoint GET
        self.run_test("Get Status Checks", "GET", "api/status", 200)
        
        # Test status endpoint POST
        test_data = {"client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"}
        self.run_test("Create Status Check", "POST", "api/status", 200, data=test_data)

def main():
    print("🚀 Starting Valentine's Day Website Backend Tests")
    print("=" * 50)
    
    # Setup
    tester = SimpleAPITester()
    
    # Run basic health tests
    tester.test_health_endpoints()

    # Print results
    print(f"\n📊 Backend Tests Summary:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("✅ All backend tests passed!")
        return 0
    else:
        print("❌ Some backend tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())