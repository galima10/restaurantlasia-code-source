<?php
/**
 * Register Custom Gutenberg Blocks
 * Ce fichier enregistre les blocs Gutenberg personnalisés pour le thème.
 */

// Enqueue les blocs editor scripts
function my_custom_theme_block_editor_assets()
{
    $theme_dir = get_template_directory_uri();

    wp_register_script(
        'theme-editor',
        $theme_dir . '/dist/editor/index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
        ),
        filemtime(get_template_directory() . '/dist/editor/index.js'),
        true
    );

    wp_enqueue_script('theme-editor');
}
add_action('enqueue_block_editor_assets', 'my_custom_theme_block_editor_assets');

// Enregistre les blocs personnalisés
function my_custom_theme_register_blocks()
{
    register_block_type(__DIR__ . '/../blocks/childrenPages/complex-four-images');
    register_block_type(__DIR__ . '/../blocks/childrenPages/complex-message-form');
    register_block_type(__DIR__ . '/../blocks/childrenPages/complex-triple-images');
    register_block_type(__DIR__ . '/../blocks/childrenPages/cta-block');
    register_block_type(__DIR__ . '/../blocks/childrenPages/flagship-product');
    register_block_type(__DIR__ . '/../blocks/childrenPages/intro-disposition-1');
    register_block_type(__DIR__ . '/../blocks/childrenPages/intro-disposition-2');
    register_block_type(__DIR__ . '/../blocks/childrenPages/simple-message-form');
    register_block_type(__DIR__ . '/../blocks/childrenPages/simple-text');
    register_block_type(__DIR__ . '/../blocks/childrenPages/simple-text-button');
    register_block_type(__DIR__ . '/../blocks/childrenPages/header-page-container');
    register_block_type(__DIR__ . '/../blocks/childrenPages/local-reviews-list');
    register_block_type(__DIR__ . '/../blocks/childrenPages/product-list');

    register_block_type(__DIR__ . '/../blocks/frontPage/gallery-grid');
    register_block_type(__DIR__ . '/../blocks/frontPage/front-page-hero');
    register_block_type(__DIR__ . '/../blocks/frontPage/local-reviews');
    register_block_type(__DIR__ . '/../blocks/frontPage/google-reviews');

    register_block_type(__DIR__ . '/../blocks/general/two-images-text');
    register_block_type(__DIR__ . '/../blocks/general/simple-image-text');
    register_block_type(__DIR__ . '/../blocks/general/reservation');
    register_block_type(__DIR__ . '/../blocks/general/faq-list');
    register_block_type(__DIR__ . '/../blocks/general/flagship-products-module');
}
add_action('init', 'my_custom_theme_register_blocks');

// Restreint les types de blocs disponibles selon le contexte (page d’accueil, CPT, etc.)
add_filter('allowed_block_types_all', function ($allowed_blocks, $editor_context) {
    if ($editor_context->post) {
        // ID de la page définie comme page d'accueil
        $front_page_id = get_option('page_on_front');

        if ($editor_context->post->ID == $front_page_id) {
            // autoriser seulement certains blocs sur la page d'accueil
            return [
                'theme/gallery-grid',
                'theme/local-reviews',
                'theme/google-reviews',

                'theme/two-images-text',
                'theme/simple-image-text',
                'theme/reservation',
                'theme/faq-list',
                'theme/flagship-products-module',
            ];
        }

        if ($editor_context->post->post_type === 'product') {
            return [
                'core/paragraph',
                'theme/reservation',
            ];
        }

        if ($editor_context->post->post_type === 'page') {
            // pour toutes les autres pages, tu peux autoriser seulement les blocs classiques
            return [
                'theme/complex-four-images',
                'theme/complex-message-form',
                'theme/complex-triple-images',
                'theme/cta-block',
                'theme/flagship-product',
                'theme/intro-disposition-1',
                'theme/intro-disposition-2',
                'theme/simple-message-form',
                'theme/simple-text',
                'theme/simple-text-button',
                'theme/header-page-container',
                'theme/local-reviews-list',
                'theme/product-list',

                'theme/two-images-text',
                'theme/simple-image-text',
                'theme/reservation',
                'theme/faq-list',
                'theme/flagship-products-module',
            ];
        }
    }

    // fallback pour tous les autres contextes
    return $allowed_blocks;
}, 10, 2);