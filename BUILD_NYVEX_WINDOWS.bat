@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules\next (
  call npm.cmd install
  if errorlevel 1 (pause & exit /b 1)
)
call npm.cmd run build
if errorlevel 1 (
  echo Build failed. Copy the error above and send it to ChatGPT.
) else (
  echo Build completed. Static output: out\
)
pause
