# Spoookify CLI Installer for Windows
# Usage: irm https://raw.githubusercontent.com/MAXxDEVIL/spoookify/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

$Repo = "MAXxDEVIL/spoookify"
$Version = "v0.1.0"
$BinaryName = "spoookify"
$InstallDir = "$env:USERPROFILE\.spoookify\bin"

Write-Host "[INFO] Installing Spoookify CLI..." -ForegroundColor Green

# Detect architecture
$Arch = $env:PROCESSOR_ARCHITECTURE
if ($Arch -eq "AMD64") {
    $ArchType = "amd64"
} elseif ($Arch -eq "ARM64") {
    $ArchType = "arm64"
} else {
    Write-Host "[ERROR] Unsupported architecture: $Arch" -ForegroundColor Red
    exit 1
}

$BinaryFile = "$BinaryName-windows-$ArchType.exe"
$DownloadUrl = "https://github.com/$Repo/releases/download/$Version/$BinaryFile"

# Create install directory
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

Write-Host "[INFO] Downloading from $DownloadUrl" -ForegroundColor Green

try {
    $OutputPath = "$InstallDir\$BinaryName.exe"
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $OutputPath -UseBasicParsing
    Write-Host "[INFO] Installed to $OutputPath" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Download failed: $_" -ForegroundColor Red
    exit 1
}

# Add to PATH
$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($CurrentPath -notlike "*$InstallDir*") {
    $NewPath = "$CurrentPath;$InstallDir"
    [Environment]::SetEnvironmentVariable("Path", $NewPath, "User")
    Write-Host "[INFO] Added to PATH" -ForegroundColor Green
    Write-Host "[WARN] Restart your terminal for PATH changes to take effect" -ForegroundColor Yellow
}

Write-Host "[INFO] Installation complete!" -ForegroundColor Green
Write-Host "Run 'spoookify' in a new terminal to start" -ForegroundColor Green
