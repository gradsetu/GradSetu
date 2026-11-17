Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

strDir = "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web"
strCmd = "cmd.exe /k ""cd /d """ & strDir & """ && node node_modules\.bin\next dev -H 0.0.0.0 -p 3000"""

objShell.Run strCmd, 1, False
