export interface CarouselSlide {
  number: number
  type: 'accroche' | 'contenu' | 'cta'
  emoji: string
  title: string
  content: string
}

export interface CarouselResult {
  slides: CarouselSlide[]
  caption: string
}

export interface VideoIdea {
  title: string
  hook: string
  structure: string[]
  screenText: string[]
  script: string
  caption: string
}

export interface VideoIdeasResult {
  ideas: VideoIdea[]
}

export type Tool = 'carousel' | 'post' | 'story' | 'videos' | 'photo'
