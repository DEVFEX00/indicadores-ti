@echo off
title Dashboard de Indicadores TI
cd /d "%~dp0"

echo ===================================================
echo     Iniciando Dashboard de Indicadores de TI
echo ===================================================
echo.
echo Servidor rodando em: http://localhost:3000
echo Abrindo seu navegador padrao...
echo.
echo Para encerrar o servidor, feche esta janela.
echo ===================================================
echo.

start http://localhost:3000
node server.js
pause
