<?php
session_start();

// horario de sao paulo
date_default_timezone_set('America/Sao_Paulo');

// Constantes de configuracao definidas no VirtualHost (já chegamos lá).
define('DEVELOPMENT', (bool) getenv("DEVELOPMENT"));
define('SHOW_ERRORS', (bool) getenv("SHOW_ERRORS"));
if (SHOW_ERRORS) {
	error_reporting(E_ALL);
	ini_set('display_errors', true);
}

// Diretorio raiz
// Tudo é relativo à raiz do sistema
chdir(__DIR__);

// Funcoes simples que você pode querer implementar (opcional)
// include_once './functions.php';

// Setup autoloading composer
if (file_exists('vendor/autoload.php')) {
	$loader = include 'vendor/autoload.php';
	
	// Você pode adicionar suas bibliotecas aqui, se quiser.
	// $loader->add('System', 'library/.');
} else {
	exit("Dependências do projeto não encontradas, execute o comando 'php composer.phar install'");
}

// Para rodar o framework bastam essas duas linhas.
$mvc = SuitUpStart::setup('modulos/');

// Caso queira monitorar as consultas SQL
// Cuidado para não deixar habilitado em ambiente de produção
// $mvc->setSqlMonitor(DEVELOPMENT);

$mvc->run();
