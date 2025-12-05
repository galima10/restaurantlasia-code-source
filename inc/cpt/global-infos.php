<?php
/**
 * Global Infos Settings Page
 * Ce fichier crée une page de réglages admin pour gérer les informations globales telles que
 * le numéro de téléphone, l'email, l'adresse, les heures d'ouverture, les jours de fermeture, et les détails Instagram.
 */

// Ajoute une page de réglages dans le menu "Réglages"
add_action('admin_menu', function () {
    add_options_page(
        'Infos globales',           // Titre de la page
        'Infos globales',           // Titre du menu
        'manage_options',           // Capacité nécessaire
        'theme-global-settings',    // Slug
        'theme_render_global_settings_page' // Callback pour afficher le contenu
    );
});

// Callback pour afficher le contenu de la page de réglages
function theme_render_global_settings_page()
{
?>
    <div class="wrap">
        <h1>Infos globales du site</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('theme_globals');   // Groupe d’options
            do_settings_sections('theme-global-settings'); // Sections
            submit_button();
            ?>
        </form>
    </div>
<?php
}

// Enregistre les options et ajoute les sections et champs
add_action('admin_init', function () {
    // Enregistre le groupe d’options
    register_setting('theme_globals', 'phone');
    register_setting('theme_globals', 'email');
    register_setting('theme_globals', 'address');

    // Ajoute une section
    add_settings_section(
        'main_section',                  // ID
        'Coordonnées',                   // Titre
        null,                             // Callback pour description (null ici)
        'theme-global-settings'          // Page slug
    );

    // Champs téléphone
    add_settings_field(
        'phone',
        'Téléphone',
        function () {
            $value = get_option('phone', '');
            echo "<input type='text' name='phone' value='" . esc_attr($value) . "' class='regular-text' />";
        },
        'theme-global-settings',
        'main_section'
    );

    // Champ adresse
    add_settings_field(
        'address',
        'Adresse',
        function () {
            $value = get_option('address', '');
            echo "<textarea name='address' class='regular-text'>" . esc_textarea($value) . "</textarea>";
        },
        'theme-global-settings',
        'main_section'
    );

    // Champs Heures d’ouverture
    add_settings_field(
        'opening_hours',
        'Heures d\'ouverture',
        function () {

            // MIDI
            $midi_start_h = get_option('midi_start_h', '');
            $midi_start_m = get_option('midi_start_m', '');
            $midi_end_h   = get_option('midi_end_h', '');
            $midi_end_m   = get_option('midi_end_m', '');

            // SOIR
            $soir_start_h = get_option('soir_start_h', '');
            $soir_start_m = get_option('soir_start_m', '');
            $soir_end_h   = get_option('soir_end_h', '');
            $soir_end_m   = get_option('soir_end_m', '');

            echo '<div style="margin-bottom:8px;">';
            echo '<strong>Midi :</strong> ';
            echo '<input type="number" name="midi_start_h" value="' . esc_attr($midi_start_h) . '" min="0" max="23" style="width:60px;" /> h ';
            echo '<input type="number" name="midi_start_m" value="' . esc_attr($midi_start_m) . '" min="0" max="45" step="15" style="width:60px;" /> min — ';
            echo '<input type="number" name="midi_end_h" value="' . esc_attr($midi_end_h) . '" min="0" max="23" style="width:60px;" /> h ';
            echo '<input type="number" name="midi_end_m" value="' . esc_attr($midi_end_m) . '" min="0" max="45" step="15" style="width:60px;" /> min';
            echo '</div>';

            echo '<div>';
            echo '<strong>Soir :</strong> ';
            echo '<input type="number" name="soir_start_h" value="' . esc_attr($soir_start_h) . '" min="0" max="23" style="width:60px;" /> h ';
            echo '<input type="number" name="soir_start_m" value="' . esc_attr($soir_start_m) . '" min="0" max="45" step="15" style="width:60px;" /> min — ';
            echo '<input type="number" name="soir_end_h" value="' . esc_attr($soir_end_h) . '" min="0" max="23" style="width:60px;" /> h ';
            echo '<input type="number" name="soir_end_m" value="' . esc_attr($soir_end_m) . '" min="0" max="45" step="15" style="width:60px;" /> min';
            echo '</div>';
        },
        'theme-global-settings',
        'main_section'
    );

    // Enregistre toutes les nouvelles options (8 champs)
    register_setting('theme_globals', 'midi_start_h');
    register_setting('theme_globals', 'midi_start_m');
    register_setting('theme_globals', 'midi_end_h');
    register_setting('theme_globals', 'midi_end_m');

    register_setting('theme_globals', 'soir_start_h');
    register_setting('theme_globals', 'soir_start_m');
    register_setting('theme_globals', 'soir_end_h');
    register_setting('theme_globals', 'soir_end_m');


    // Ajout du champ jours de fermeture

    add_settings_field(
        'closed_days',
        'Jours de fermeture',
        function () {

            // Valeur enregistrée (tableau de noms de jours)
            $closed_days = get_option('closed_days', []);
            $days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

            foreach ($days as $day) {
                $checked = in_array($day, $closed_days) ? 'checked' : '';
                echo '<label style="margin-right:10px;">';
                echo '<input type="checkbox" name="closed_days[]" value="' . esc_attr($day) . '" ' . $checked . '> ' . ucfirst($day);
                echo '</label>';
            }
        },
        'theme-global-settings',
        'main_section'
    );

    register_setting('theme_globals', 'closed_days', [
        'type' => 'array',
        'sanitize_callback' => function ($input) {

            $days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

            if (!is_array($input)) return [];

            // Ne garder que les jours valides
            return array_values(array_filter($input, function ($day) use ($days) {
                return in_array($day, $days);
            }));
        },
        'default' => [],
    ]);



    // Champ instagram
    register_setting('theme_globals', 'instagram_link');
    register_setting('theme_globals', 'instagram_account');

    // Ajoute un champ pour le lien Instagram
    add_settings_field(
        'instagram_link',
        'Lien Instagram',
        function () {
            $value = get_option('instagram_link', '');
            echo "<input type='url' name='instagram_link' value='" . esc_attr($value) . "' class='regular-text' placeholder='https://www.instagram.com/votrecompte/' />";
        },
        'theme-global-settings',
        'main_section'
    );

    // Ajoute un champ pour le nom du compte Instagram
    add_settings_field(
        'instagram_account',
        'Nom du compte Instagram',
        function () {
            $value = get_option('instagram_account', '');
            echo "<input type='text' name='instagram_account' value='" . esc_attr($value) . "' class='regular-text' placeholder='Nom du compte Instagram' />";
        },
        'theme-global-settings',
        'main_section'
    );
});

?>