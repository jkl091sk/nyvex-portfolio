@echo off
setlocal
cd /d "%~dp0"
echo =====================================
echo       NYVEX - CLOUDFLARE CHECK
echo =====================================
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js 22 or newer is required.
  pause
  exit /b 1
)
call npm.cmd install
if errorlevel 1 goto failed
call npm.cmd run build
if errorlevel 1 goto failed
call npm.cmd run verify:export
if errorlevel 1 goto failed
echo.
echo SUCCESS: out folder is ready for Cloudflare Pages.
echo Creating NYVEX_STATIC_UPLOAD.zip for optional drag-and-drop upload...
powershell.exe -NoProfile -Command "Compress-Archive -Path 'out\*' -DestinationPath 'NYVEX_STATIC_UPLOAD.zip' -Force"
if errorlevel 1 (
  echo Build passed. The out folder is ready, but ZIP creation failed.
) else (
  echo NYVEX_STATIC_UPLOAD.zip created.
)
echo.
echo IMPORTANT: Upload the built out folder or ZIP for Direct Upload, NOT this source archive.
pause
exit /b 0
:failed
echo.
echo ERROR: Could not install, build, or verify NYVEX.
echo Copy the error above and share it for debugging.
pause
exit /b 1
