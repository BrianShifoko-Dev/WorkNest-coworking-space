# PowerShell script to fix all API routes to use getSupabaseClient

$apiFiles = @(
    "app/api/spaces/[id]/route.ts",
    "app/api/spaces/route.ts",
    "app/api/users/[id]/route.ts",
    "app/api/users/route.ts",
    "app/api/settings/route.ts",
    "app/api/notifications/route.ts",
    "app/api/notifications/mark-all-read/route.ts",
    "app/api/notifications/[id]/route.ts",
    "app/api/analytics/route.ts",
    "app/api/customers/[id]/route.ts",
    "app/api/payments/route.ts",
    "app/api/payments/[id]/route.ts",
    "app/api/emails/route.ts",
    "app/api/upload/route.ts",
    "app/api/gallery/[id]/route.ts",
    "app/api/gallery/route.ts",
    "app/api/menu/[id]/route.ts",
    "app/api/menu/route.ts",
    "app/api/events/[id]/route.ts",
    "app/api/events/route.ts",
    "app/api/customers/route.ts",
    "app/api/bookings/check-availability/route.ts",
    "app/api/bookings/[id]/route.ts",
    "app/api/simple-login/route.ts",
    "app/api/payments/initiate/route.ts",
    "app/api/payments/callback/route.ts"
)

foreach ($file in $apiFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "WARNING: Skipping $file (not found)"
        continue
    }
    
    Write-Host "Fixing $file ..."
    
    $content = Get-Content $file -Raw
    
    # Replace the imports and variable declarations
    $content = $content -replace "import { createClient } from '@supabase/supabase-js'", "import { getSupabaseClient } from '@/lib/supabase-server'"
    $content = $content -replace "const supabaseUrl = process\.env\.NEXT_PUBLIC_SUPABASE_URL!`r?`n", ""
    $content = $content -replace "const supabaseKey = process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY!`r?`n", ""
    $content = $content -replace "const supabaseUrl = process\.env\.NEXT_PUBLIC_SUPABASE_URL!`n", ""
    $content = $content -replace "const supabaseKey = process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY!`n", ""
    
    # Add dynamic export if not present
    if ($content -notmatch "export const dynamic = 'force-dynamic'") {
        $content = $content -replace "(import .+?`n`n)", "`$1// Force dynamic rendering for this route`nexport const dynamic = 'force-dynamic'`nexport const runtime = 'nodejs'`n`n"
    }
    
    # Replace createClient calls
    $content = $content -replace "createClient\(supabaseUrl, supabaseKey\)", "getSupabaseClient()"
    
    # Save the file
    Set-Content -Path $file -Value $content -NoNewline
    
    Write-Host "SUCCESS: Fixed $file"
}

Write-Host ""
Write-Host "All API routes fixed successfully!"

