@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (echo Please install Node.js 22 or newer. & pause & exit /b 1)
if not exist node_modules\next (
  call npm.cmd install
  if errorlevel 1 (pause & exit /b 1)
)
echo Opening NYVEX development server (Webpack) on http://localhost:3000/en/
call npm.cmd run dev -- -H 0.0.0.0
pause
