<?php
/**
 * Custom Post Type Products
 * Ce fichier enregistre un Custom Post Type (CPT) pour les Produits et une taxonomie associée : Catégories de produits.
 */

// Enregistre le Custom Post Type "Produit"
function register_cpt_products()
{

    $labels = [
        'name'               => 'Produits',
        'singular_name'      => 'Produit',
        'menu_name'          => 'Produits',
        'name_admin_bar'     => 'Produit',
        'add_new'            => 'Ajouter un produit',
        'add_new_item'       => 'Ajouter un nouveau produit',
        'new_item'           => 'Nouveau produit',
        'edit_item'          => 'Modifier le produit',
        'view_item'          => 'Voir le produit',
        'all_items'          => 'Tous les produits',
        'search_items'       => 'Rechercher des produits',
        'not_found'          => 'Aucun produit trouvé',
        'not_found_in_trash' => 'Aucun produit dans la corbeille'
    ];

    $args = [
        'labels'             => $labels,
        'public'             => true,
        'show_in_rest'       => true, // important pour Gutenberg
        'menu_icon'          => 'dashicons-cart',
        'supports'           => ['title', 'thumbnail', 'editor'],
        'has_archive'        => false,
        'rewrite'            => ['slug' => 'produit'],
    ];

    register_post_type('product', $args);
}
add_action('init', 'register_cpt_products');

// Enregistre la taxonomie "Catégorie de produit"
function register_product_taxonomies()
{

    $labels = [
        'name'              => 'Catégories de produits',
        'singular_name'     => 'Catégorie de produit',
        'search_items'      => 'Rechercher une catégorie',
        'all_items'         => 'Toutes les catégories',
        'parent_item'       => 'Catégorie parente',
        'parent_item_colon' => 'Catégorie parente :',
        'edit_item'         => 'Modifier la catégorie',
        'update_item'       => 'Mettre à jour la catégorie',
        'add_new_item'      => 'Ajouter une nouvelle catégorie',
        'new_item_name'     => 'Nom de la nouvelle catégorie',
        'menu_name'         => 'Catégories de produits',
    ];

    $args = [
        'hierarchical'      => true, // comme les catégories native WP
        'labels'            => $labels,
        'show_ui'           => true,
        'show_in_rest'      => true, // important pour Gutenberg
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => ['slug' => 'categorie-produit'],
    ];

    register_taxonomy('product_category', ['product'], $args);
}
add_action('init', 'register_product_taxonomies');