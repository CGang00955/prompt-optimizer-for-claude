@echo off
echo ========================================
echo 推送代码到GitHub
echo ========================================
echo.

cd /d "C:\Users\Administrator\prompt-optimizer-for-claude"

echo 当前目录: %CD%
echo.

echo 1. 检查Git状态...
git status

echo.
echo 2. 推送到GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 成功推送到GitHub！
    echo.
    echo 📌 项目地址: https://github.com/CGang00955/prompt-optimizer-for-claude
    echo 📌 安装命令: npx prompt-optimizer-for-claude
) else (
    echo.
    echo ❌ 推送失败，请检查：
    echo 1. 网络连接是否正常
    echo 2. 是否已配置GitHub认证
    echo 3. 仓库是否存在
    echo.
    echo 💡 如果遇到认证问题，请运行：
    echo    git config --global credential.helper store
    echo 然后重新推送
)

echo.
pause