@echo off
echo ========================================
echo 检查GitHub仓库并推送
echo ========================================
echo.

cd /d "C:\Users\Administrator\prompt-optimizer-for-claude"

echo 检查远程仓库配置...
git remote -v

echo.
echo 当前分支状态:
git branch

echo.
echo 尝试推送...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ 成功！代码已推送到GitHub！
    echo ========================================
    echo.
    echo 📌 项目地址: https://github.com/CGang00955/prompt-optimizer-for-claude
    echo 📌 一键安装: npx prompt-optimizer-for-claude
    echo.
    echo 现在任何人都可以通过一行命令安装Claude提示词优化器了！
) else (
    echo.
    echo ========================================
    echo ❌ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. GitHub仓库尚未创建
    echo 2. 仓库名称不正确
    echo.
    echo 请确认：
    echo - 访问 https://github.com/new
    echo - 创建仓库: prompt-optimizer-for-claude
    echo - 设置为Public
    echo.
    echo 然后重新运行此脚本。
)

echo.
pause