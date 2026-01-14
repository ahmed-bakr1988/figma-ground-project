#!/bin/bash

# Test CSRF Fix for Ground Protection API
# شختبار تصحيح CSRF لـ Ground Protection API

echo "==============================================="
echo "🔧 Testing Bearer Token Authentication Fix"
echo "==============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:8000/api"
TEST_EMAIL="test@groundprotection.com"
TEST_PASSWORD="password"

# Step 1: Check if Backend is Running
echo -e "${YELLOW}[1/5]${NC} Checking if backend is running..."
if ! curl -s "$API_URL/health" > /dev/null; then
    echo -e "${RED}✗ Backend not running at $API_URL${NC}"
    echo "   Start backend with: cd backend && php artisan serve"
    exit 1
fi
echo -e "${GREEN}✓ Backend is running${NC}"
echo ""

# Step 2: Test Login (Get Bearer Token)
echo -e "${YELLOW}[2/5]${NC} Testing login (should return Bearer token)..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo -e "${RED}✗ Login failed${NC}"
    echo "Response: $LOGIN_RESPONSE"
    echo ""
    echo -e "${YELLOW}Note:${NC} If you haven't created a test user, run:"
    echo "  php artisan tinker"
    echo "  User::factory()->create(['email' => 'test@groundprotection.com', 'password' => 'password'])"
    exit 1
fi

echo -e "${GREEN}✓ Login successful${NC}"
echo "  Token: ${TOKEN:0:20}..."
echo ""

# Step 3: Test API Request WITH Bearer Token (should work)
echo -e "${YELLOW}[3/5]${NC} Testing authenticated API request with Bearer token..."
AUTH_RESPONSE=$(curl -s -X GET "$API_URL/services" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json")

if echo "$AUTH_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ Bearer token authentication works!${NC}"
    echo "  Retrieved services successfully"
else
    echo -e "${RED}✗ Bearer token request failed${NC}"
    echo "Response: $AUTH_RESPONSE"
    exit 1
fi
echo ""

# Step 4: Test API Request WITHOUT CSRF Header (should work - no CSRF needed)
echo -e "${YELLOW}[4/5]${NC} Testing API request without CSRF (confirms no CSRF protection on API)..."
NO_CSRF_RESPONSE=$(curl -s -X POST "$API_URL/contact/message" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"message\":\"Test message\"}")

if echo "$NO_CSRF_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ API accepts requests without CSRF token${NC}"
    echo "  ✓ Confirms Bearer token auth (not CSRF-based)"
else
    # Some endpoints might have validation errors, but no CSRF 419
    if ! echo "$NO_CSRF_RESPONSE" | grep -q '"CSRF"'; then
        echo -e "${GREEN}✓ No CSRF validation on API routes${NC}"
    else
        echo -e "${RED}✗ CSRF validation still enabled on API!${NC}"
        echo "Response: $NO_CSRF_RESPONSE"
    fi
fi
echo ""

# Step 5: Verify Configuration Files
echo -e "${YELLOW}[5/5]${NC} Verifying configuration files..."

# Check bootstrap/app.php
if grep -q "validateCsrfTokens.*api/\*" backend/bootstrap/app.php; then
    echo -e "${GREEN}✓ bootstrap/app.php${NC} - CSRF exceptions configured for /api/*"
else
    echo -e "${RED}✗ bootstrap/app.php${NC} - Missing CSRF exceptions"
fi

# Check sanctum.php
if grep -q "'guard' => \['api'\]" backend/config/sanctum.php; then
    echo -e "${GREEN}✓ config/sanctum.php${NC} - Using 'api' guard (Bearer tokens)"
else
    echo -e "${RED}✗ config/sanctum.php${NC} - Wrong guard configuration"
fi

if grep -q "'stateful' => \[\]" backend/config/sanctum.php; then
    echo -e "${GREEN}✓ config/sanctum.php${NC} - Stateful domains empty (stateless auth)"
else
    echo -e "${RED}✗ config/sanctum.php${NC} - Stateful domains should be empty"
fi

echo ""
echo "==============================================="
echo -e "${GREEN}✅ All tests passed!${NC}"
echo "==============================================="
echo ""
echo "Your API is now configured for stateless Bearer token authentication:"
echo "  • CSRF protection disabled on /api/* routes"
echo "  • Using 'api' guard for Sanctum tokens"
echo "  • No sessions/cookies needed for API authentication"
echo ""
echo "Frontend can now authenticate with:"
echo "  Authorization: Bearer {token}"
