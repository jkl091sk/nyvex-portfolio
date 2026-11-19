@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo           NYVEX v2.10 / CONTACT FORM
 echo ==========================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js not found. Please install Node.js 22 or newer first.
  pause
  exit /b 1
)
if not exist node_modules\next (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo Installation failed. Copy the error above and send it to ChatGPT.
    pause
    exit /b 1
  )
)
echo Starting NYVEX on http://localhost:3000
call npm.cmd run dev -- -H 0.0.0.0
pause
