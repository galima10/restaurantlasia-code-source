<?php
/**
 * Enqueue Theme Assets
 * Ce fichier gère l'inclusion des fichiers CSS et JS du thème, y compris les assets générés par Vite pour une application React.
 */

function my_custom_theme_scripts()
{
    $theme_dir = get_template_directory_uri();

    // ------------------------
    // Styles et scripts React
    // ------------------------
    // CSS du build Vite front-end
    wp_enqueue_style(
        'react-app-style',
        $theme_dir . '/dist/front-app/index.css', // chemin vers le build Vite
        array(),
        null
    );

    // JS du build Vite front-end
    wp_enqueue_script(
        'react-app-script',
        $theme_dir . '/dist/front-app/index.js',
        array(),
        null,
        true
    );
}

add_action('wp_enqueue_scripts', 'my_custom_theme_scripts');