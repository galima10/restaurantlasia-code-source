<?php

/**
 * Menu admin pour la gestion du contenu du site
 * Ce fichier ajoute un menu admin personnalisé et des sous-menus pour gérer les produits et pages mis en avant.
 */

// Menu principal "Gestion du contenu"
add_action('admin_menu', function () {
    add_menu_page(
        'Gestion du contenu',    // Titre de la page
        'Gestion du contenu',    // Label menu
        'manage_options',        // Capability
        'site-content-manager',  // Slug
        function () {            // Callback vide pour la page parent
            echo '<div class="wrap"><h1>Gestion du contenu du site</h1><p>Sélectionnez une section dans le menu.</p></div>';
        },
        'dashicons-admin-generic', // Icône
        28                         // Position dans le menu
    );
});

add_action('admin_menu', function () {
    add_submenu_page(
        'site-content-manager',    // Slug du parent
        'Produits mis en avant',   // Titre page
        'Produits mis en avant',   // Label menu
        'manage_options',          // Capability
        'featured-products',       // Slug
        'render_featured_products_admin_page' // Callback
    );
});

// Callback pour afficher la page des produits mis en avant
function render_featured_products_admin_page()
{
    $featured_ids = get_option('featured_products_ids', []);

    $products = get_posts([
        'post_type' => 'product',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC'
    ]);

    echo '<div class="wrap"><h1>Produits mis en avant</h1>';
    echo '<form method="post">';
    wp_nonce_field('save_featured_products', 'featured_products_nonce');

    echo '<p>Cochez jusqu\'à 3 produits :</p>';
    echo '<ul style="list-style:none;padding-left:0;">';

    foreach ($products as $product) {
        $checked = in_array($product->ID, $featured_ids) ? 'checked' : '';
        echo '<li><label>';
        echo '<input type="checkbox" name="featured_products[]" value="' . $product->ID . '" ' . $checked . '> ';
        echo esc_html($product->post_title);
        echo '</label></li>';
    }

    echo '</ul>';
    submit_button();
    echo '</form></div>';

    echo '<script>
        const checkboxes = document.querySelectorAll("input[name=\'featured_products[]\']");
        checkboxes.forEach(cb => cb.addEventListener("change", function() {
            const checked = Array.from(checkboxes).filter(c => c.checked);
            if (checked.length > 3) {
                this.checked = false;
                alert("Vous ne pouvez sélectionner que 3 produits au maximum.");
            }
        }));
    </script>';
}

// Sauvegarde des produits mis en avant
add_action('admin_init', function () {

    if (
        !isset($_POST['featured_products_nonce']) ||
        !wp_verify_nonce($_POST['featured_products_nonce'], 'save_featured_products')
    ) {
        return;
    }

    if (isset($_POST['featured_products']) && is_array($_POST['featured_products'])) {
        $featured_ids = array_slice(array_map('intval', $_POST['featured_products']), 0, 3);
        update_option('featured_products_ids', $featured_ids);
    } else {
        update_option('featured_products_ids', []);
    }
});

function theme_add_featured_pages_submenu()
{
    add_submenu_page(
        'site-content-manager',
        'Page mise en avant',
        'Page mise en avant',
        'edit_pages',
        'featured-page',
        'theme_render_featured_page_admin'
    );
}
add_action('admin_menu', 'theme_add_featured_pages_submenu');

// Callback pour afficher la page mise en avant
function theme_render_featured_page_admin()
{

    // ID de la page mise en avant
    $featured_page_id = get_option('featured_page_id', '');

    // ID de la page d'accueil (front page)
    $front_page_id = get_option('page_on_front');

    // Toutes les pages sauf front page
    $pages = get_pages([
        'exclude' => [$front_page_id],
        'sort_column' => 'post_title',
        'sort_order'  => 'ASC',
    ]);

    echo '<div class="wrap"><h1>Page mise en avant</h1>';
    echo '<form method="post">';
    wp_nonce_field('save_featured_page', 'featured_page_nonce');

    echo '<p>Choisissez la page à mettre en avant :</p>';

    echo '<ul style="list-style:none;padding-left:0;">';

    foreach ($pages as $page) {
        $checked = ($page->ID == $featured_page_id) ? 'checked' : '';

        echo '<li>';
        echo '<label>';
        echo '<input type="radio" name="featured_page" value="' . $page->ID . '" ' . $checked . '> ';
        echo esc_html($page->post_title);
        echo '</label>';
        echo '</li>';
    }

    echo '</ul>';

    submit_button('Enregistrer');
    echo '</form></div>';
}

// Sauvegarde de la page mise en avant
function theme_save_featured_page()
{
    if (
        !isset($_POST['featured_page_nonce']) ||
        !wp_verify_nonce($_POST['featured_page_nonce'], 'save_featured_page')
    ) {
        return;
    }

    if (isset($_POST['featured_page'])) {
        update_option('featured_page_id', intval($_POST['featured_page']));
    }
}
add_action('admin_init', 'theme_save_featured_page');
