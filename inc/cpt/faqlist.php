<?php
/**
 * Custom Post Type FAQ
 * Ce fichier enregistre un Custom Post Type (CPT) pour les FAQ (Foire Aux Questions).
 */

add_action('init', 'theme_register_cpt_faq');
function theme_register_cpt_faq()
{
    $labels = [
        'name'                  => 'FAQs',
        'singular_name'         => 'FAQ',
        'menu_name'             => 'FAQ',
        'name_admin_bar'        => 'FAQ',
        'add_new'               => 'Ajouter',
        'add_new_item'          => 'Ajouter une question',
        'new_item'              => 'Nouvelle question',
        'edit_item'             => 'Modifier la question',
        'view_item'             => 'Voir la question',
        'all_items'             => 'Toutes les questions',
        'search_items'          => 'Rechercher',
        'not_found'             => 'Aucune question trouvée',
        'not_found_in_trash'    => 'Aucune question dans la corbeille',
    ];

    $args = [
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => ['slug' => 'faq'],
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-editor-help', // icône sympa pour FAQ
        'supports'           => ['title', 'editor', 'page-attributes'], // page-attributes = menu_order
    ];

    register_post_type('faq', $args);
}