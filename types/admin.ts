import { ContentBlock as CommonContentBlock } from './common'

// Types pour les composants admin (utilisent string[] pour les images)
export interface ContentBlockForm extends Omit<CommonContentBlock, 'images'> {
  images?: string[] // URLs des images
}

// Types pour les composants de formulaire
export interface FormContentBlock extends ContentBlockForm {
  // Hérite de ContentBlockForm
}

// Types pour les composants d'affichage (utilisent string[] pour les images)
export interface DisplayContentBlock extends CommonContentBlock {
  // Hérite de CommonContentBlock (images: string[])
}
