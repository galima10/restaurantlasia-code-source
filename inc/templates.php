<?php
/**
 * Theme Template Modifications
 * Ce fichier contient des fonctions pour modifier le contenu des pages via des blocs Gutenberg verrouillés.
 */

// Assure que le bloc "front-page-hero" est toujours présent sur la page d'accueil
add_action('init', 'theme_ensure_frontpage_hero_block');

function theme_ensure_frontpage_hero_block()
{
    // Identifiant de la page d'accueil statique (Settings > Reading)
    $front_page_id = (int) get_option('page_on_front');
    if (! $front_page_id) {
        return;
    }

    $post = get_post($front_page_id);
    if (! $post) {
        return;
    }

    // Slug exact de ton bloc (remplace si différent)
    $block_name = 'theme/front-page-hero';

    // Markup du bloc verrouillé à insérer (préfixe en haut du contenu)
    // Ajoute className si tu veux cibler côté front
    $block_markup = '<!-- wp:' . $block_name . ' {"lock":{"move":false,"remove":false}} /-->' . "\n\n";

    // Si le bloc n'est pas présent dans le contenu, on le prépend
    if (strpos($post->post_content, 'wp:' . $block_name) === false) {
        // Prépend le bloc au contenu existant
        $new_content = $block_markup . $post->post_content;

        // Met à jour le post (ne change pas le statut, auteur, etc.)
        wp_update_post([
            'ID' => $front_page_id,
            'post_content' => $new_content,
        ]);
    }
}

// Restreint l'utilisation du bloc "front-page-hero" uniquement à la page d'accueil
add_filter('allowed_block_types_all', 'theme_allow_block_only_on_front', 10, 2);
function theme_allow_block_only_on_front($allowed, $context)
{
    // Nom exact du bloc
    $block_name = 'theme/front-page-hero';

    // Si pas de post dans le contexte — ne rien toucher
    if (empty($context->post) || ! isset($context->post->ID)) {
        return $allowed;
    }

    $front_page_id = (int) get_option('page_on_front');

    // Si on est sur la page d'accueil : on ne change rien
    if ($context->post->ID === $front_page_id) {
        return $allowed;
    }

    // Si $allowed est true (tous autorisés), on renvoie false sauf si on veut filtrer autrement
    if ($allowed === true) {
        // autorise tout sauf notre bloc
        // impossible dister directement, donc on retourne true (ne restreint pas), sauf si tu veux restreindre
        return $allowed;
    }

    // Si c'est un tableau de blocs autorisés, on supprime notre bloc
    if (is_array($allowed)) {
        return array_values(array_filter($allowed, function ($b) use ($block_name) {
            return ($b !== $block_name);
        }));
    }

    return $allowed;
}

// Assure que le bloc "header-page-container" est toujours présent en haut de chaque page (sauf front page)
function theme_add_header_block_to_page($post_id, $post, $update)
{
    // Vérifie qu'on est bien sur une page
    if ($post->post_type !== 'page') {
        return;
    }

    // Ignore le front page
    $front_page_id = (int) get_option('page_on_front');
    if ($post_id === $front_page_id) {
        return;
    }

    // Nom du bloc
    $block_name = 'theme/header-page-container';
    $block_markup = '<!-- wp:' . $block_name . ' /-->' . "\n\n";

    // Vérifie si le bloc est déjà présent
    if (strpos($post->post_content, 'wp:' . $block_name) === false) {
        // Préfixe le bloc tout en haut du contenu
        $new_content = $block_markup . $post->post_content;

        // Met à jour le post **sans provoquer de boucle infinie**
        remove_action('save_post', 'theme_add_header_block_to_page', 10);
        wp_update_post([
            'ID'           => $post_id,
            'post_content' => $new_content,
        ]);
        add_action('save_post', 'theme_add_header_block_to_page', 10, 3);
    }
}
add_action('save_post', 'theme_add_header_block_to_page', 10, 3);