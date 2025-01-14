# Scénario de gestion des lumières, portes, fenêtres et alarmes

## Pendant les heures de travail (entre `start time` et `end time`)
- Les **lumières** s’allument **uniquement** si un capteur de présence est actif.
- Les **alarmes** sont **désactivées**.

## À la fin des heures de travail (à `end time`)
- Les **fenêtres** et les **portes** se **ferment**.

## Pendant les heures hors travail (entre `end time` et `start time`)
- Les **lumières** s’**éteignent**.
- Les **alarmes** sont **désactivées** tant qu’**aucun** capteur de présence ne passe à actif, ou qu’**aucune** porte ou fenêtre n’est ouverte.
- Le **capteur de présence** s’**active** si au moins un utilisateur est présent dans la pièce.

## À la fin des heures hors travail (à `start time`)
- Les **fenêtres** et les **portes** s’**ouvrent**.