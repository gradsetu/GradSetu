@echo off
title GradSetu Dev Server
color 0A
echo.
echo  ====================================================
echo   GradSetu - Starting Dev Server
echo  ====================================================
echo.

cd /d "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web"

echo [1/4] Killing any existing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/4] Clearing stale .next cache (prevents ChunkLoadError)...
if exist ".next" rmdir /s /q ".next"
echo       Done!

echo [3/4] Starting GradSetu dev server...
echo.
echo  --------------------------------------------------
echo   Once you see: "Ready in Xs" open Chrome and go to:
echo   http://localhost:3000
echo  --------------------------------------------------
echo.

npm run dev

pause
