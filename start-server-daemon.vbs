Set objShell = CreateObject("WScript.Shell")
objShell.CurrentDirectory = "c:\Users\Sumit\Desktop\Project APEX\Startup\GradSetu\GradSetu MVP\gradsetu v1 web"
objShell.Run "cmd.exe /k npm run start", 1, False
