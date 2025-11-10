# PowerShell script to download AI-generated faces
# This script will help you get 3 AI-generated faces for your team

Write-Host "AI Face Generator Helper" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""
Write-Host "This script will help you download 3 AI-generated faces"
Write-Host "from thispersondoesnotexist.com for your team members"
Write-Host ""

$faces = @(
    @{Name="Sarah Chen"; Gender="Female"; Age="30-35"; File="sarah-chen.jpg"},
    @{Name="Alexander Kovac"; Gender="Male"; Age="40-45"; File="alexander-kovac.jpg"},
    @{Name="Luca Martinelli"; Gender="Male"; Age="35-40"; File="luca-martinelli.jpg"}
)

foreach ($face in $faces) {
    Write-Host "Generating face for: $($face.Name)" -ForegroundColor Cyan
    Write-Host "  Gender: $($face.Gender), Age: $($face.Age)" -ForegroundColor Yellow
    
    try {
        # Download image from thispersondoesnotexist.com
        $url = "https://thispersondoesnotexist.com/image"
        $output = "public\images\$($face.File)"
        
        Write-Host "  Downloading..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        Write-Host "  Success! Saved to: $output" -ForegroundColor Green
        
        # Wait a bit before next request
        Start-Sleep -Seconds 2
    }
    catch {
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "  Please manually download from: https://thispersondoesnotexist.com/" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

Write-Host "Done! Check the public/images/ folder for your team photos." -ForegroundColor Green
Write-Host ""
Write-Host "If any downloads failed, please manually:" -ForegroundColor Yellow
Write-Host "1. Visit https://thispersondoesnotexist.com/" -ForegroundColor Yellow
Write-Host "2. Refresh until you find a suitable face" -ForegroundColor Yellow
Write-Host "3. Right-click and Save image to public/images/" -ForegroundColor Yellow
