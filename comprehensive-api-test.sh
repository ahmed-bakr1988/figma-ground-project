#!/bin/bash

###############################################################################
# 🧪 Professional API Testing Suite
# اختبار شامل لـ API مع كشف أخطاء CSRF والأداء
###############################################################################

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
API_URL="http://localhost:8000"
API_ENDPOINT="/api/contact/message"
RESPONSE_TIME_THRESHOLD=5000  # ms
OPTIMAL_RESPONSE_TIME=1000    # ms

# Test data
TEST_DATA='{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "5551234567",
  "subject": "Testing",
  "message": "This is a test message with more than 10 characters for validation"
}'

###############################################################################
# Helper Functions
###############################################################################

print_header() {
    echo -e "\n${CYAN}════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}\n"
}

print_test() {
    echo -e "${YELLOW}→ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ  $1${NC}"
}

###############################################################################
# Test 1: Check Server Availability
###############################################################################

test_server_availability() {
    print_header "Test 1: Server Availability"
    print_test "Checking if Backend is running on $API_URL..."
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/health")
    
    if [ "$response" = "200" ]; then
        print_success "Backend is running"
        return 0
    else
        print_error "Backend not responding (Status: $response)"
        return 1
    fi
}

###############################################################################
# Test 2: Health Check Endpoint
###############################################################################

test_health_endpoint() {
    print_header "Test 2: Health Check Endpoint"
    print_test "Calling /api/health..."
    
    response=$(curl -s "$API_URL/api/health")
    status=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/health")
    
    print_info "Status Code: $status"
    print_info "Response:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    
    if echo "$response" | jq -e '.success' >/dev/null 2>&1; then
        print_success "Health check passed"
        return 0
    else
        print_error "Invalid health response structure"
        return 1
    fi
}

###############################################################################
# Test 3: CORS Headers Verification
###############################################################################

test_cors_headers() {
    print_header "Test 3: CORS Headers"
    print_test "Checking CORS headers..."
    
    headers=$(curl -s -i -H "Origin: http://localhost:5173" \
                    -H "Access-Control-Request-Method: POST" \
                    "$API_URL$API_ENDPOINT" 2>&1)
    
    cors_header=$(echo "$headers" | grep -i "Access-Control-Allow-Origin" || echo "NOT_FOUND")
    
    if [[ "$cors_header" != "NOT_FOUND" ]]; then
        print_success "CORS Header found: $cors_header"
    else
        print_error "CORS Header NOT found"
    fi
    
    # Check other CORS headers
    echo "$headers" | grep -i "Access-Control-Allow" | while read line; do
        print_info "$line"
    done
}

###############################################################################
# Test 4: Response Status Code
###############################################################################

test_response_status() {
    print_header "Test 4: Response Status Code"
    print_test "Sending POST request to $API_ENDPOINT..."
    
    local temp_file=$(mktemp)
    status=$(curl -s -w "%{http_code}" -X POST "$API_URL$API_ENDPOINT" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d "$TEST_DATA" \
        -o "$temp_file")
    
    response=$(cat "$temp_file")
    rm "$temp_file"
    
    print_info "Status Code: $status"
    
    # Analyze status code
    case $status in
        201)
            print_success "Status 201: Resource Created ✅"
            return 0
            ;;
        200)
            print_success "Status 200: OK"
            return 0
            ;;
        422)
            print_error "Status 422: Unprocessable Entity (Validation Error)"
            print_info "Response: $response"
            return 1
            ;;
        419)
            print_error "Status 419: CSRF TOKEN MISMATCH ⚠️"
            print_error "This indicates the route has CSRF protection enabled"
            print_error "Likely cause: Route is in web.php instead of api.php"
            return 1
            ;;
        500)
            print_error "Status 500: Internal Server Error"
            print_error "Backend encountered an error"
            print_info "Response: $response"
            return 1
            ;;
        403)
            print_error "Status 403: Forbidden"
            print_info "Response: $response"
            return 1
            ;;
        *)
            print_error "Status $status: Unexpected response"
            print_info "Response: $response"
            return 1
            ;;
    esac
}

###############################################################################
# Test 5: Response JSON Structure
###############################################################################

test_response_structure() {
    print_header "Test 5: Response JSON Structure"
    print_test "Validating JSON structure..."
    
    local temp_file=$(mktemp)
    curl -s -X POST "$API_URL$API_ENDPOINT" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d "$TEST_DATA" \
        -o "$temp_file"
    
    response=$(cat "$temp_file")
    rm "$temp_file"
    
    # Check if valid JSON
    if ! echo "$response" | jq . >/dev/null 2>&1; then
        print_error "Response is not valid JSON"
        print_info "Response: $response"
        return 1
    fi
    
    print_success "Valid JSON structure"
    
    # Check required fields
    if echo "$response" | jq -e '.success' >/dev/null 2>&1; then
        print_success "Field 'success' present"
    else
        print_error "Field 'success' missing"
    fi
    
    if echo "$response" | jq -e '.message' >/dev/null 2>&1; then
        print_success "Field 'message' present"
    else
        print_error "Field 'message' missing"
    fi
    
    # Display full response
    print_info "Full Response:"
    echo "$response" | jq '.'
    
    return 0
}

###############################################################################
# Test 6: CSRF Error Detection
###############################################################################

test_csrf_detection() {
    print_header "Test 6: CSRF Error Detection"
    print_test "Checking for CSRF-related errors..."
    
    local temp_file=$(mktemp)
    status=$(curl -s -w "%{http_code}" -X POST "$API_URL$API_ENDPOINT" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d "$TEST_DATA" \
        -o "$temp_file")
    
    response=$(cat "$temp_file")
    rm "$temp_file"
    
    # Check for CSRF indicators
    if echo "$response" | grep -qi "csrf"; then
        print_error "CSRF Error detected!"
        print_error "Message: $(echo "$response" | jq '.message' 2>/dev/null || echo "$response")"
        
        print_info ""
        print_error "DIAGNOSIS:"
        print_error "→ The route is likely in web.php instead of api.php"
        print_error "→ OR statefulApi() middleware is still enabled"
        print_error "→ OR CSRF middleware is explicitly applied"
        
        return 1
    fi
    
    # Check for 419 status
    if [ "$status" = "419" ]; then
        print_error "CSRF Token Mismatch (419) detected!"
        return 1
    fi
    
    print_success "No CSRF errors detected"
    return 0
}

###############################################################################
# Test 7: Response Time
###############################################################################

test_response_time() {
    print_header "Test 7: Performance - Response Time"
    print_test "Measuring response time..."
    
    # Measure time
    local temp_file=$(mktemp)
    time_taken=$(curl -s -w "%{time_total}" -X POST "$API_URL$API_ENDPOINT" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d "$TEST_DATA" \
        -o "$temp_file")
    
    rm "$temp_file"
    
    # Convert to milliseconds
    time_ms=$(echo "$time_taken * 1000" | bc | cut -d'.' -f1)
    
    print_info "Response Time: ${time_ms}ms (${time_taken}s)"
    
    # Check thresholds
    if [ "$time_ms" -lt "$OPTIMAL_RESPONSE_TIME" ]; then
        print_success "Excellent performance (< 1s)"
    elif [ "$time_ms" -lt "$RESPONSE_TIME_THRESHOLD" ]; then
        print_success "Good performance (< 5s)"
    else
        print_error "Slow response (> 5s) - May indicate backend issue"
    fi
    
    return 0
}

###############################################################################
# Test 8: Content-Type Headers
###############################################################################

test_content_type() {
    print_header "Test 8: Content-Type Headers"
    print_test "Checking response headers..."
    
    headers=$(curl -s -i -X POST "$API_URL$API_ENDPOINT" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d "$TEST_DATA" 2>&1 | head -20)
    
    if echo "$headers" | grep -qi "application/json"; then
        print_success "Content-Type: application/json"
    else
        print_error "Invalid Content-Type"
    fi
    
    print_info "Response Headers:"
    echo "$headers" | grep -i "^" | head -10
}

###############################################################################
# Test 9: Route Location Verification
###############################################################################

test_route_location() {
    print_header "Test 9: Route Location Diagnosis"
    print_test "Analyzing route configuration..."
    
    print_info "Checking if route is in api.php vs web.php..."
    
    # Check api.php
    if grep -q "contact/message" backend/routes/api.php 2>/dev/null; then
        print_success "Route found in api.php ✅ (Correct)"
    else
        print_error "Route NOT found in api.php"
    fi
    
    # Check web.php
    if grep -q "contact/message" backend/routes/web.php 2>/dev/null; then
        print_error "Route found in web.php ❌ (Has CSRF protection)"
        print_error "This is the problem! Move route to api.php"
    fi
    
    return 0
}

###############################################################################
# Test 10: Configuration Check
###############################################################################

test_configuration() {
    print_header "Test 10: Configuration Check"
    print_test "Verifying backend configuration..."
    
    # Check SESSION_DRIVER
    if grep -q "SESSION_DRIVER=file" backend/.env 2>/dev/null; then
        print_success "SESSION_DRIVER=file ✅"
    else
        print_error "SESSION_DRIVER not set to file"
    fi
    
    # Check CACHE_STORE
    if grep -q "CACHE_STORE=file" backend/.env 2>/dev/null; then
        print_success "CACHE_STORE=file ✅"
    else
        print_error "CACHE_STORE not set to file"
    fi
    
    # Check FRONTEND_URL
    frontend_url=$(grep "FRONTEND_URL" backend/.env 2>/dev/null | cut -d'=' -f2)
    if echo "$frontend_url" | grep -q "localhost:3000"; then
        print_success "FRONTEND_URL includes localhost:3000 ✅"
    else
        print_error "localhost:3000 not in FRONTEND_URL"
    fi
    
    if echo "$frontend_url" | grep -q "localhost:5173"; then
        print_success "FRONTEND_URL includes localhost:5173 ✅"
    else
        print_error "localhost:5173 not in FRONTEND_URL"
    fi
}

###############################################################################
# Generate Summary Report
###############################################################################

generate_summary() {
    print_header "SUMMARY & RECOMMENDATIONS"
    
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}Test Results Summary:${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}\n"
    
    # Check if route is in web.php
    if grep -q "contact/message" backend/routes/web.php 2>/dev/null; then
        print_error "CRITICAL ISSUE FOUND:"
        print_error "Route is in web.php - This has CSRF protection!"
        echo ""
        print_info "SOLUTION:"
        echo "  1. Remove route from backend/routes/web.php"
        echo "  2. Ensure route is in backend/routes/api.php"
        echo "  3. Restart Backend: php artisan serve"
        echo ""
    fi
    
    # Check bootstrap/app.php
    if grep -q "statefulApi()" backend/bootstrap/app.php 2>/dev/null; then
        print_error "statefulApi() is still enabled in bootstrap/app.php"
        print_info "This forces CSRF protection on API routes"
        print_info "Remove it or ensure routes are under api() middleware group"
    fi
    
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}Troubleshooting Guide:${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}\n"
    
    echo -e "${YELLOW}If still getting 419 CSRF error:${NC}"
    echo "  1. Check: grep -r 'contact/message' backend/routes/"
    echo "  2. Ensure route is ONLY in api.php"
    echo "  3. Clear config: php artisan config:clear"
    echo "  4. Restart: php artisan serve"
    echo ""
    
    echo -e "${YELLOW}If getting 500 error:${NC}"
    echo "  1. Check: tail -f backend/storage/logs/laravel.log"
    echo "  2. Verify MySQL: mysql -u root -p"
    echo "  3. Check: php artisan tinker → DB::connection()->getPdo();"
    echo ""
    
    echo -e "${YELLOW}Best Practice for API:${NC}"
    echo "  ✅ Routes in api.php (prefix: 'api')"
    echo "  ✅ No CSRF middleware"
    echo "  ✅ Bearer token authentication"
    echo "  ✅ SESSION_DRIVER=file (not database)"
    echo "  ✅ CACHE_STORE=file (not database)"
    echo ""
}

###############################################################################
# Main Execution
###############################################################################

main() {
    clear
    echo -e "${CYAN}"
    cat << "EOF"
    ╔═══════════════════════════════════════════════════════════╗
    ║   🧪 Professional API Testing Suite                       ║
    ║   اختبار شامل لـ API Contact Form Submission              ║
    ╚═══════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"
    
    # Run all tests
    test_server_availability || exit 1
    test_health_endpoint
    test_cors_headers
    test_response_status
    test_response_structure
    test_csrf_detection
    test_response_time
    test_content_type
    test_route_location
    test_configuration
    
    # Generate summary
    generate_summary
    
    echo -e "\n${CYAN}════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ Testing Complete${NC}"
    echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}\n"
}

# Execute main function
main "$@"
