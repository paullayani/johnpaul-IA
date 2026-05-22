import type { CarouselResult, VideoIdeasResult } from '@/types'

export function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function demoCarousel(subject: string): CarouselResult {
  return {
    slides: [
      {
        number: 1,
        type: 'accroche',
        emoji: '👁️',
        title: `${subject || 'Choisir ses lunettes'} : tout ce qu'on ne vous dit pas`,
        content: 'La plupart des gens portent des lunettes qui ne leur correspondent pas vraiment. Voici pourquoi.',
      },
      {
        number: 2,
        type: 'contenu',
        emoji: '⭕',
        title: 'Visage rond',
        content: 'Optez pour des montures rectangulaires ou angulaires. Elles allongent vos traits et structurent le regard.',
      },
      {
        number: 3,
        type: 'contenu',
        emoji: '🔷',
        title: 'Visage ovale',
        content: 'La chance : presque toutes les formes vous conviennent. Osez l\'originalité et l\'audace.',
      },
      {
        number: 4,
        type: 'contenu',
        emoji: '🔺',
        title: 'Visage carré',
        content: 'Adoucissez vos angles avec des montures rondes, cat-eye ou aviateur. L\'effet est immédiat.',
      },
      {
        number: 5,
        type: 'cta',
        emoji: '📍',
        title: 'Essayez en magasin',
        content: 'Venez tester 10 montures en 20 minutes. Nos opticiens vous guident. Prise de RDV en bio.',
      },
    ],
    caption: `Vous ne savez pas quelles lunettes vous vont vraiment ?\n\nLa forme de vos montures peut transformer — ou gâcher — un visage.\n\nVoici le guide complet pour enfin choisir les bonnes ✨\n\nPrenez rendez-vous en magasin pour un essayage personnalisé — lien en bio 👆\n\n—\n#optique #lunettes #opticien #montures #styleoptique #choixlunettes #conseil #vision #soinvue #eyewear #glasses #optometrie #modeoptique #lunettesdeforme #beauté #style #tendance #bienetre #santevisuelle #johnpauloptique`,
  }
}

export function demoPost(description: string): string {
  return `Il y a des lunettes qu'on met.
Et des lunettes qu'on devient.

${description ? `${description.charAt(0).toUpperCase() + description.slice(1)} — ` : ''}Chaque détail est pensé pour vous. Chaque verre, taillé pour votre vie.

Venez les essayer. Prenez rendez-vous 👆 Lien en bio.

—
#lunettes #opticien #montures #eyewear #glasses #optique #modeoptique #luxe #qualité #artisanat #style #vision #beauté #premium #tendance #lunettesdeforme #opticien #santevisuelle #conseil #johnpauloptique`
}

export function demoStory(intent: string): string {
  return `🎯 TEXTE PRINCIPAL
"${intent ? intent.split(' ').slice(0, 5).join(' ') + ' ?' : 'Vous voyez bien chez vous ?'}"

💬 STICKER SONDAGE
Question : Quand avez-vous fait votre dernier bilan visuel ?
Option A : Il y a moins d'un an ✅
Option B : Il y a plus d'un an 😬

❓ STICKER QUESTION OUVERTE
"Quel est votre plus grand problème avec vos lunettes actuelles ?"

🎬 CONSEIL MONTAGE
Filmez en vertical (9:16). Fond neutre ou vitrine du magasin floutée. Texte centré en gras, couleur blanche. Musique tendance, volume bas. Ajoutez l'autocollant sondage en bas, au-dessus du bord.

🔗 CTA (bouton lien)
"Prendre rendez-vous"

✨ EMOJIS SUGGÉRÉS
👁️  ✨  🔬  💡  👓`
}

export function demoVideos(): VideoIdeasResult {
  return {
    ideas: [
      {
        title: '3 signes que vos lunettes ne vous vont pas',
        hook: 'Vos lunettes vous font mal au nez ?',
        structure: [
          'Plan 1 : Intro face caméra en magasin (3 sec)',
          'Plan 2 : Montrer le problème — lunettes qui glissent (3 sec)',
          'Plan 3 : Lunettes qui laissent des marques (3 sec)',
          'Plan 4 : Consultation opticien + sourire (4 sec)',
          'Plan 5 : CTA direct à la caméra (2 sec)',
        ],
        screenText: [
          'Signe #1 : Elles glissent 😤',
          'Signe #2 : Elles laissent des marques',
          'Signe #3 : Vous voyez encore flou',
          '→ Venez nous voir, c\'est gratuit',
        ],
        script: 'Si vos lunettes glissent, laissent des marques ou vous donnent mal à la tête — elles ne sont peut-être pas adaptées. En 20 secondes, on vous explique comment régler ça.',
        caption: `3 signes que vos lunettes ont besoin d'être réajustées 👓\n\nL'ajustage est gratuit chez nous. Venez !\n\nPrenez rdv en bio 👆\n\n#lunettes #opticien #conseil #ajustage #eyewear #optique #vision #santevisuelle`,
      },
      {
        title: 'Coulisses : comment on choisit UNE monture pour VOUS',
        hook: 'Comment on choisit vos lunettes ?',
        structure: [
          'Plan 1 : Accueil client en magasin (3 sec)',
          'Plan 2 : L\'opticien analyse la morphologie (3 sec)',
          'Plan 3 : Sélection de 3 montures sur le présentoir (4 sec)',
          'Plan 4 : Essayage + réaction naturelle du client (4 sec)',
          'Plan 5 : CTA souriant (2 sec)',
        ],
        screenText: [
          'Étape 1 : On analyse votre visage',
          'Étape 2 : Sélection sur mesure',
          'Étape 3 : Essayage guidé',
          'Résultat : des lunettes qui VOUS vont ✨',
        ],
        script: 'Ce qui différencie un vrai opticien ? On ne vous laisse jamais chercher seul. Voici comment on travaille pour trouver la monture parfaite pour vous.',
        caption: `Les coulisses de notre sélection montures 🔍\n\nChoisir des lunettes, c'est votre confort visuel au quotidien.\n\nPrenez rdv — lien en bio 👆\n\n#opticien #coulisses #lunettes #conseil #optique #vision #eyewear`,
      },
      {
        title: 'Mythe vs Réalité : les idées reçues sur la vue',
        hook: '"Les écrans abîment les yeux" — vrai ou faux ?',
        structure: [
          'Plan 1 : Hook face caméra choc (3 sec)',
          'Plan 2 : Mythe #1 + correction rapide (4 sec)',
          'Plan 3 : Mythe #2 + correction rapide (4 sec)',
          'Plan 4 : Mythe #3 + correction rapide (4 sec)',
          'Plan 5 : CTA bilan visuel (2 sec)',
        ],
        screenText: [
          'MYTHE ❌',
          'RÉALITÉ ✅',
          'Mythe #1 : "Les lunettes affaiblissent la vue"',
          'Mythe #2 : "Lire dans le noir abîme les yeux"',
          'Mytre #3 : "On voit si on a besoin de lunettes"',
          'Votre vue mérite les bonnes infos 🔬',
        ],
        script: 'Vous avez sûrement entendu ça toute votre vie. On démonte les 3 plus grands mythes sur la santé visuelle — en 20 secondes chrono.',
        caption: `Les idées reçues sur la vue qu'on entend encore trop 🔬\n\nVotre santé visuelle mérite les vraies réponses.\n\nBilan visuel sur rdv 👆\n\n#optique #santevisuelle #mythes #conseil #opticien #vision #lunettes`,
      },
    ],
  }
}

export function demoPhoto(description: string): string {
  return `📝 TEXTE PRINCIPAL À SUPERPOSER
"La vue. Votre super-pouvoir."

💬 SOUS-TEXTE OPTIONNEL
"Pris en charge Sécu + mutuelle · John Paul Optique"

📸 LÉGENDE INSTAGRAM
${description ? `${description.charAt(0).toUpperCase() + description.slice(1)}.` : 'Un regard, une identité.'}

Parce que vos lunettes disent quelque chose de vous avant même que vous parliez.

Venez découvrir notre sélection — conseils personnalisés offerts 🤍

Prenez votre rendez-vous 👆 Lien en bio.

—
#optique #lunettes #opticien #eyewear #montures #style #vision #beauté #premium #qualité #conseil #santevisuelle #johnpauloptique #modeoptique #glasses

🎨 IDÉE DE MONTAGE
Recadrez en 4:5 (portrait Instagram optimal). Appliquez un filtre chaud légèrement désaturé pour un rendu premium. Placez le texte principal centré en haut, police sans-serif épaisse, couleur blanche. Sous-texte en bas, plus petit, légèrement transparent.

🖼️ VERSION CARROUSEL (si applicable)
Slide 1 : Photo pleine page + "La vue. Votre super-pouvoir." (texte blanc)
Slide 2 : Zoom détail monture + conseil morphologie
Slide 3 : Présentation de 2 autres coloris disponibles
Slide 4 : "Essayez-les en magasin" + adresse + prise de RDV

✨ CONSEIL CRÉATIF
Filmez ou photographiez depuis une légère hauteur pour un angle plus moderne et dynamique. Un détail de monture flou au premier plan crée une profondeur très premium. Assurez une lumière naturelle douce — pas de flash direct.`
}
