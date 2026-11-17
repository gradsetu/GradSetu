@echo off
cd /d "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web"
echo Starting Next.js production server... > "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web\prod-server.log" 2>&1
"C:\Program Files\nodejs\node.exe" "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web\node_modules\next\dist\bin\next" start -p 3000 -H 0.0.0.0 >> "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web\prod-server.log" 2>&1
