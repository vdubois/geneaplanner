# language: fr
Fonctionnalité: Connexion à la plateforme

  Scénario: Connexion avec un utilisateur valide
    Etant donné qu'il existe un utilisateur
      | identifiant              | motDePasse   |
      | geneaplanner@yopmail.com | G3n3@pl@nn3r |
    Et que j'accède à Généaplanner
    Quand je me connecte avec "geneaplanner@yopmail.com" et "G3n3@pl@nn3r"
    Alors on me demande de saisir mes informations personnelles
