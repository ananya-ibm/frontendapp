:<<"::CMDLITERAL"
@ECHO OFF
GOTO :CMDSCRIPT
::CMDLITERAL

docker network create --driver bridge exo-net || true
exit 0

:CMDSCRIPT
docker network create --driver bridge exo-net & EXIT 0