@echo off
title GradSetu Web Server [RUNNING]
cd /d "%~dp0"

echo ========================================================
echo   Starting GradSetu Next.js Server on http://localhost:3000
echo   PLEASE KEEP THIS WINDOW OPEN WHILE BROWSING
echo ========================================================
echo.

npm run dev
pause
