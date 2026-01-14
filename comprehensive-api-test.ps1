# ═══════════════════════════════════════════════════════════
# 🧪 Professional API Testing Suite (PowerShell)
# اختبار شامل لـ API مع كشف أخطاء CSRF والأداء
# ═══════════════════════════════════════════════════════════

# Configuration
$API_URL = "http://localhost:8000"
$API_ENDPOINT = "/api/contact/message"
$RESPONSE_TIME_THRESHOLD = 5000  # ms
$OPTIMAL_RESPONSE_TIME = 1000    # ms

# Test data
$TEST_DATA = @{
    name    = "Test User"
    email   = "test@example.com"
    phone   = "5551234567"
    subject = "Testing"
    message = "This is a test message with more than 10 characters for validation"
} | ConvertTo-Json

# ═══════════════════════════════════════════════════════════
# Helper Functions
# ═══════════════════════════════════════════════════════════

function Write-Header {
    param([string]$Text)
    Write-Host "`n" -ForegroundColor Cyan
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host $Text -ForegroundColor Blue
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "`n"
}

function Write-Test {
    param([string]$Text)
    Write-Host "→ $Text" -ForegroundColor Yellow
}

function Write-Success {
    param([string]$Text)
    Write-Host "✅ $Text" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Text)
    Write-Host "❌ $Text" -ForegroundColor Red
}

function Write-Info {
    param([string]$Text)
    Write-Host "ℹ  $Text" -ForegroundColor Blue
}

# ═══════════════════════════════════════════════════════════
# Test 1: Server Availability
# ═══════════════════════════════════════════════════════════

function Test-ServerAvailability {
    Write-Header "Test 1: Server Availability"
    Write-Test "Checking if Backend is running on $API_URL..."
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL/api/health" -Method Get -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Success "Backend is running"
            return $true
        }
    }
    catch {
        Write-Error-Custom "Backend not responding: $_"
        return $false
    }
}

# ═══════════════════════════════════════════════════════════
# Test 2: Health Check Endpoint
# ═══════════════════════════════════════════════════════════

function Test-HealthEndpoint {
    Write-Header "Test 2: Health Check Endpoint"
    Write-Test "Calling /api/health..."
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL/api/health" -Method Get
        $body = $response.Content | ConvertFrom-Json
        
        Write-Info "Status Code: $($response.StatusCode)"
        Write-Info "Response:"
        Write-Host ($body | ConvertTo-Json) -ForegroundColor Gray
        
        if ($body.success -eq $true) {
            Write-Success "Health check passed"
            return $true
        }
    }
    catch {
        Write-Error-Custom "Health check failed: $_"
        return $false
    }
}

# ═══════════════════════════════════════════════════════════
# Test 3: CORS Headers
# ═══════════════════════════════════════════════════════════

function Test-CorsHeaders {
    Write-Header "Test 3: CORS Headers"
    Write-Test "Checking CORS headers..."
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL$API_ENDPOINT" -Method Options `
            -Headers @{
                "Origin" = "http://localhost:5173"
                "Access-Control-Request-Method" = "POST"
            } -ErrorAction SilentlyContinue
        
        $corsHeader = $response.Headers["Access-Control-Allow-Origin"]
        
        if ($corsHeader) {
            Write-Success "CORS Header found: $corsHeader"
        }
        else {
            Write-Error-Custom "CORS Header NOT found"
        }
        
        $response.Headers.GetEnumerator() | Where-Object { $_.Key -like "*Access-Control*" } | ForEach-Object {
            Write-Info "$($_.Key): $($_.Value)"
        }
    }
    catch {
        Write-Info "CORS check returned: $_"
    }
}

# ═══════════════════════════════════════════════════════════
# Test 4: Response Status Code
# ═══════════════════════════════════════════════════════════

function Test-ResponseStatus {
    Write-Header "Test 4: Response Status Code"
    Write-Test "Sending POST request to $API_ENDPOINT..."
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL$API_ENDPOINT" -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Accept"       = "application/json"
            } `
            -Body $TEST_DATA -ErrorAction Stop
        
        Write-Info "Status Code: $($response.StatusCode)"
        Write-Success "Status 200/201: Request succeeded ✅"
        return $true
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        Write-Info "Status Code: $statusCode"
        
        switch ($statusCode) {
            419 {
                Write-Error-Custom "Status 419: CSRF TOKEN MISMATCH ⚠️"
                Write-Error-Custom "This indicates the route has CSRF protection enabled"
                Write-Error-Custom "Likely cause: Route is in web.php instead of api.php"
                return $false
            }
            500 {
                Write-Error-Custom "Status 500: Internal Server Error"
                Write-Error-Custom "Backend encountered an error"
                $content = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($content)
                $response = $reader.ReadToEnd()
                Write-Info "Response: $response"
                return $false
            }
            422 {
                Write-Error-Custom "Status 422: Unprocessable Entity (Validation Error)"
                $content = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($content)
                $response = $reader.ReadToEnd()
                Write-Info "Response: $response"
                return $false
            }
            default {
                Write-Error-Custom "Status $statusCode: Unexpected response"
                return $false
            }
        }
    }
}

# ═══════════════════════════════════════════════════════════
# Test 5: Response JSON Structure
# ═══════════════════════════════════════════════════════════

function Test-ResponseStructure {
    Write-Header "Test 5: Response JSON Structure"
    Write-Test "Validating JSON structure..."
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL$API_ENDPOINT" -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Accept"       = "application/json"
            } `
            -Body $TEST_DATA -ErrorAction Stop
        
        $body = $response.Content | ConvertFrom-Json
        
        Write-Success "Valid JSON structure"
        Write-Success "Response:"
        Write-Host ($body | ConvertTo-Json) -ForegroundColor Gray
        
        # Check required fields
        if ($body.success) {
            Write-Success "Field 'success' is present"
        }
        
        if ($body.message) {
            Write-Success "Field 'message' is present"
        }
        
        return $true
    }
    catch {
        Write-Error-Custom "Failed to parse JSON response"
        return $false
    }
}

# ═══════════════════════════════════════════════════════════
# Test 6: CSRF Error Detection
# ═══════════════════════════════════════════════════════════

function Test-CsrfDetection {
    Write-Header "Test 6: CSRF Error Detection"
    Write-Test "Checking for CSRF-related errors..."
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL$API_ENDPOINT" -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Accept"       = "application/json"
            } `
            -Body $TEST_DATA -ErrorAction Stop
        
        Write-Success "No CSRF errors detected"
        return $true
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        
        if ($statusCode -eq 419) {
            Write-Error-Custom "CSRF Token Mismatch (419) detected!"
            Write-Error-Custom ""
            Write-Error-Custom "DIAGNOSIS:"
            Write-Error-Custom "→ The route is likely in web.php instead of api.php"
            Write-Error-Custom "→ OR statefulApi() middleware is still enabled"
            Write-Error-Custom "→ OR CSRF middleware is explicitly applied"
            return $false
        }
        
        if ($_.Exception.Response.Content -like "*csrf*") {
            Write-Error-Custom "CSRF Error detected!"
            return $false
        }
        
        Write-Success "No CSRF errors detected"
        return $true
    }
}

# ═══════════════════════════════════════════════════════════
# Test 7: Response Time
# ═══════════════════════════════════════════════════════════

function Test-ResponseTime {
    Write-Header "Test 7: Performance - Response Time"
    Write-Test "Measuring response time..."
    
    try {
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        
        $response = Invoke-WebRequest -Uri "$API_URL$API_ENDPOINT" -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Accept"       = "application/json"
            } `
            -Body $TEST_DATA -ErrorAction Stop
        
        $stopwatch.Stop()
        $timeTaken = $stopwatch.ElapsedMilliseconds
        
        Write-Info "Response Time: ${timeTaken}ms"
        
        if ($timeTaken -lt $OPTIMAL_RESPONSE_TIME) {
            Write-Success "Excellent performance (< 1s)"
        }
        elseif ($timeTaken -lt $RESPONSE_TIME_THRESHOLD) {
            Write-Success "Good performance (< 5s)"
        }
        else {
            Write-Error-Custom "Slow response (> 5s) - May indicate backend issue"
        }
    }
    catch {
        Write-Error-Custom "Failed to measure response time"
    }
}

# ═══════════════════════════════════════════════════════════
# Test 8: Route Location Verification
# ═══════════════════════════════════════════════════════════

function Test-RouteLocation {
    Write-Header "Test 8: Route Location Diagnosis"
    Write-Test "Analyzing route configuration..."
    
    $apiRoutePath = "backend\routes\api.php"
    $webRoutePath = "backend\routes\web.php"
    
    # Check api.php
    if (Test-Path $apiRoutePath) {
        $apiContent = Get-Content $apiRoutePath -Raw
        if ($apiContent -like "*contact/message*") {
            Write-Success "Route found in api.php ✅ (Correct)"
        }
        else {
            Write-Error-Custom "Route NOT found in api.php"
        }
    }
    
    # Check web.php
    if (Test-Path $webRoutePath) {
        $webContent = Get-Content $webRoutePath -Raw
        if ($webContent -like "*contact/message*") {
            Write-Error-Custom "Route found in web.php ❌ (Has CSRF protection)"
            Write-Error-Custom "This is the problem! Move route to api.php"
            return $false
        }
    }
    
    return $true
}

# ═══════════════════════════════════════════════════════════
# Test 9: Configuration Check
# ═══════════════════════════════════════════════════════════

function Test-Configuration {
    Write-Header "Test 9: Configuration Check"
    Write-Test "Verifying backend configuration..."
    
    $envPath = "backend\.env"
    
    if (Test-Path $envPath) {
        $envContent = Get-Content $envPath -Raw
        
        # Check SESSION_DRIVER
        if ($envContent -like "*SESSION_DRIVER=file*") {
            Write-Success "SESSION_DRIVER=file ✅"
        }
        else {
            Write-Error-Custom "SESSION_DRIVER not set to file"
        }
        
        # Check CACHE_STORE
        if ($envContent -like "*CACHE_STORE=file*") {
            Write-Success "CACHE_STORE=file ✅"
        }
        else {
            Write-Error-Custom "CACHE_STORE not set to file"
        }
        
        # Check FRONTEND_URL
        if ($envContent -like "*localhost:3000*") {
            Write-Success "FRONTEND_URL includes localhost:3000 ✅"
        }
        
        if ($envContent -like "*localhost:5173*") {
            Write-Success "FRONTEND_URL includes localhost:5173 ✅"
        }
    }
}

# ═══════════════════════════════════════════════════════════
# Generate Summary Report
# ═══════════════════════════════════════════════════════════

function Generate-Summary {
    Write-Header "SUMMARY & RECOMMENDATIONS"
    
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "Test Results Summary:" -ForegroundColor Blue
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    $webRoutePath = "backend\routes\web.php"
    if (Test-Path $webRoutePath) {
        $webContent = Get-Content $webRoutePath -Raw
        if ($webContent -like "*contact/message*") {
            Write-Error-Custom "CRITICAL ISSUE FOUND:"
            Write-Error-Custom "Route is in web.php - This has CSRF protection!"
            Write-Host ""
            Write-Info "SOLUTION:"
            Write-Host "  1. Remove route from backend/routes/web.php"
            Write-Host "  2. Ensure route is in backend/routes/api.php"
            Write-Host "  3. Restart Backend: php artisan serve"
            Write-Host ""
        }
    }
    
    # Check bootstrap/app.php
    $bootstrapPath = "backend\bootstrap\app.php"
    if (Test-Path $bootstrapPath) {
        $bootstrapContent = Get-Content $bootstrapPath -Raw
        if ($bootstrapContent -like "*statefulApi()*") {
            Write-Error-Custom "statefulApi() is still enabled in bootstrap/app.php"
            Write-Info "This forces CSRF protection on API routes"
            Write-Info "Remove it or ensure routes are under api() middleware group"
        }
    }
    
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "Troubleshooting Guide:" -ForegroundColor Blue
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "If still getting 419 CSRF error:" -ForegroundColor Yellow
    Write-Host "  1. Check: Get-Content backend\routes\api.php | Select-String 'contact/message'"
    Write-Host "  2. Ensure route is ONLY in api.php"
    Write-Host "  3. Clear config: php artisan config:clear"
    Write-Host "  4. Restart: php artisan serve"
    Write-Host ""
    
    Write-Host "If getting 500 error:" -ForegroundColor Yellow
    Write-Host "  1. Check logs: Get-Content -Tail 50 backend\storage\logs\laravel.log"
    Write-Host "  2. Verify MySQL connection"
    Write-Host "  3. Run: php artisan tinker"
    Write-Host ""
    
    Write-Host "Best Practice for API:" -ForegroundColor Yellow
    Write-Host "  ✅ Routes in api.php (prefix: 'api')"
    Write-Host "  ✅ No CSRF middleware"
    Write-Host "  ✅ Bearer token authentication"
    Write-Host "  ✅ SESSION_DRIVER=file (not database)"
    Write-Host "  ✅ CACHE_STORE=file (not database)"
    Write-Host ""
}

# ═══════════════════════════════════════════════════════════
# Main Execution
# ═══════════════════════════════════════════════════════════

function Invoke-Tests {
    Clear-Host
    
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║   🧪 Professional API Testing Suite                       ║" -ForegroundColor Cyan
    Write-Host "║   اختبار شامل لـ API Contact Form Submission              ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    # Run all tests
    Test-ServerAvailability | Out-Null
    Test-HealthEndpoint | Out-Null
    Test-CorsHeaders | Out-Null
    Test-ResponseStatus | Out-Null
    Test-ResponseStructure | Out-Null
    Test-CsrfDetection | Out-Null
    Test-ResponseTime | Out-Null
    Test-RouteLocation | Out-Null
    Test-Configuration | Out-Null
    
    # Generate summary
    Generate-Summary
    
    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "✅ Testing Complete" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
}

# Execute
Invoke-Tests
