# EtuReminder

## Description

**EtuReminder** est un bot Discord conçu pour aider les étudiants à gérer leurs rappels de cours et de dates de rendu. Avec **EtuReminder**, vous pouvez facilement créer, visualiser et suivre vos rappels dans un environnement convivial.

## Fonctionnalités

- **Création de rappels** : Ajoutez des rappels pour vos cours et dates de rendu.
- **Affichage des rappels actifs** : Visualisez tous vos rappels actifs sous forme d'embed clair et structuré.
- **Interactions Discord** : Utilisez des commandes intuitives pour interagir avec le bot.

## Installation

Pour installer et exécuter **EtuReminder** sur votre machine locale, suivez ces étapes :

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/EtuReminder.git
   ```

2. **Naviguez dans le dossier du projet :**

   ```bash
   cd EtuReminder
   ```

3. **Installez les dépendances :**

   Assurez-vous d'avoir Node.js et npm installés sur votre machine. Ensuite, exécutez :

   ```bash
   npm install
   ```

4. **Configurez votre bot Discord :**

   - Créez un bot sur le [Portail des développeurs Discord](https://discord.com/developers/applications).
   - Copiez votre token de bot et collez-le dans un fichier `data/config.json` comme suit :

     ```
    {
        "token": "VOTRE_TOKEN",
        "discordClientId": "VOTRE_DISCORD_CLIENT_ID",
        "guildId": "ID_SERVER"
    }
     ```

5. **Démarrez le bot :**

   ```bash
   npm run start
   ```

## Utilisation

- Pour créer un rappel, utilisez la commande suivante :

  ```
  /reminder <cours> <date_de_rendu> <heure_de_rendu> <sujet>
  ```

- Pour afficher vos rappels actifs, utilisez :

  ```
  /display
  ```

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des issues ou des pull requests sur ce dépôt.

## Auteurs

- **Votre Nom** - *Zalgow* - [Votre GitHub](https://github.com/zalgow667)

## Licence

Ce projet est sous licence MIT. Pour plus de détails, veuillez consulter le fichier [LICENSE](LICENSE).
