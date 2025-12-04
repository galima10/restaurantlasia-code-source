<?php
/**
 * Theme Setup
 * Ce fichier configure les fonctionnalités de base du thème, telles que le support des images mises en avant et l'enregistrement des menus de navigation.
 */

function my_custom_theme_setup()
{
    add_theme_support('post-thumbnails');

    add_theme_support('custom-logo', array(
        'height'      => 200,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'eemi-custom-theme'),
    ));
}
add_action('after_setup_theme', 'my_custom_theme_setup');