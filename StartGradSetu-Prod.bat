@echo off
title GradSetu Production Server
color 0B
echo.
echo  ====================================================
echo   GradSetu - Production Server (Fast Start)
echo  ====================================================
echo.

cd /d "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web"

echo [1/3] Killing any existing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Building fresh (prevents ChunkLoadError)...
echo       This takes ~30 seconds, please wait...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo  BUILD FAILED! Check errors above.
  pause
  exit /b 1
)

echo.
echo [3/3] Starting production server...
echo.
echo  --------------------------------------------------
echo   Once you see: "Ready" open Chrome and go to:
echo   http://localhost:3000
echo  --------------------------------------------------
echo.

npm run start

pause
