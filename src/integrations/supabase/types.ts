export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aimer_commentaire: {
        Row: {
          created_at: string | null
          created_by: string | null
          id_aimer_commentaire: number
          id_commentaire: number | null
          id_utilisateur: string | null
          modified_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id_aimer_commentaire?: number
          id_commentaire?: number | null
          id_utilisateur?: string | null
          modified_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id_aimer_commentaire?: number
          id_commentaire?: number | null
          id_utilisateur?: string | null
          modified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aimer_commentaire_id_commentaire_fkey"
            columns: ["id_commentaire"]
            isOneToOne: false
            referencedRelation: "commentaire"
            referencedColumns: ["id_commentaire"]
          },
          {
            foreignKeyName: "fk_aimer_commentaire_id_utilisateur_utilisateur"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_aimer_commentaire_id_utilisateur_utilisateur"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
        ]
      }
      aimer_projet: {
        Row: {
          created_at: string | null
          created_by: string | null
          id_aimer_projet: number
          id_projet: number | null
          id_utilisateur: string | null
          modified_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id_aimer_projet?: number
          id_projet?: number | null
          id_utilisateur?: string | null
          modified_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id_aimer_projet?: number
          id_projet?: number | null
          id_utilisateur?: string | null
          modified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aimer_projet_id_projet_fkey"
            columns: ["id_projet"]
            isOneToOne: false
            referencedRelation: "projet"
            referencedColumns: ["id_projet"]
          },
          {
            foreignKeyName: "fk_aimer_projet_id_utilisateur_utilisateur"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_aimer_projet_id_utilisateur_utilisateur"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
        ]
      }
      commentaire: {
        Row: {
          created_by: string | null
          date_creation: string | null
          date_modification: string | null
          id_commentaire: number
          id_parent_commentaire: number | null
          id_projet: number | null
          id_utilisateur: string | null
          modified_at: string | null
          texte: string | null
        }
        Insert: {
          created_by?: string | null
          date_creation?: string | null
          date_modification?: string | null
          id_commentaire?: number
          id_parent_commentaire?: number | null
          id_projet?: number | null
          id_utilisateur?: string | null
          modified_at?: string | null
          texte?: string | null
        }
        Update: {
          created_by?: string | null
          date_creation?: string | null
          date_modification?: string | null
          id_commentaire?: number
          id_parent_commentaire?: number | null
          id_projet?: number | null
          id_utilisateur?: string | null
          modified_at?: string | null
          texte?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commentaire_id_commentaire_fkey"
            columns: ["id_parent_commentaire"]
            isOneToOne: false
            referencedRelation: "commentaire"
            referencedColumns: ["id_commentaire"]
          },
          {
            foreignKeyName: "commentaire_id_projet_fkey"
            columns: ["id_projet"]
            isOneToOne: false
            referencedRelation: "projet"
            referencedColumns: ["id_projet"]
          },
          {
            foreignKeyName: "fk_commentaire_id_utilisateur_utilisateur"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_commentaire_id_utilisateur_utilisateur"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
        ]
      }
      commune: {
        Row: {
          created_at: string | null
          emplacement_chef_lieu: string | null
          id_commune: number
          id_district: number | null
          id_region: number | null
          nom_commune: string
        }
        Insert: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_commune?: number
          id_district?: number | null
          id_region?: number | null
          nom_commune: string
        }
        Update: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_commune?: number
          id_district?: number | null
          id_region?: number | null
          nom_commune?: string
        }
        Relationships: [
          {
            foreignKeyName: "commune_id_district_fkey"
            columns: ["id_district"]
            isOneToOne: false
            referencedRelation: "district"
            referencedColumns: ["id_district"]
          },
        ]
      }
      conversation: {
        Row: {
          created_at: string | null
          derniere_activite: string | null
          id_conversation: number
          id_utilisateur1: string
          id_utilisateur2: string
        }
        Insert: {
          created_at?: string | null
          derniere_activite?: string | null
          id_conversation?: number
          id_utilisateur1: string
          id_utilisateur2: string
        }
        Update: {
          created_at?: string | null
          derniere_activite?: string | null
          id_conversation?: number
          id_utilisateur1?: string
          id_utilisateur2?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_id_utilisateur1_fkey1"
            columns: ["id_utilisateur1"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "conversation_id_utilisateur1_fkey1"
            columns: ["id_utilisateur1"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "conversation_id_utilisateur2_fkey1"
            columns: ["id_utilisateur2"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "conversation_id_utilisateur2_fkey1"
            columns: ["id_utilisateur2"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
        ]
      }
      culture: {
        Row: {
          cout_exploitation_ha: number | null
          created_at: string | null
          created_by: string | null
          fiche_technique: string | null
          id_culture: number
          modified_at: string | null
          nom_culture: string
          prix_tonne: number | null
          rendement_ha: number | null
        }
        Insert: {
          cout_exploitation_ha?: number | null
          created_at?: string | null
          created_by?: string | null
          fiche_technique?: string | null
          id_culture?: number
          modified_at?: string | null
          nom_culture: string
          prix_tonne?: number | null
          rendement_ha?: number | null
        }
        Update: {
          cout_exploitation_ha?: number | null
          created_at?: string | null
          created_by?: string | null
          fiche_technique?: string | null
          id_culture?: number
          modified_at?: string | null
          nom_culture?: string
          prix_tonne?: number | null
          rendement_ha?: number | null
        }
        Relationships: []
      }
      district: {
        Row: {
          created_at: string | null
          emplacement_chef_lieu: string | null
          id_district: number
          id_region: number | null
          nom_district: string
        }
        Insert: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_district?: number
          id_region?: number | null
          nom_district: string
        }
        Update: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_district?: number
          id_region?: number | null
          nom_district?: string
        }
        Relationships: [
          {
            foreignKeyName: "district_id_region_fkey"
            columns: ["id_region"]
            isOneToOne: false
            referencedRelation: "region"
            referencedColumns: ["id_region"]
          },
        ]
      }
      investissement: {
        Row: {
          created_at: string | null
          created_by: string | null
          date_decision_investir: string | null
          date_paiement: string | null
          id_investissement: number
          id_investisseur: string | null
          id_projet: number | null
          modified_at: string | null
          montant: number
          reference_paiement: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date_decision_investir?: string | null
          date_paiement?: string | null
          id_investissement?: number
          id_investisseur?: string | null
          id_projet?: number | null
          modified_at?: string | null
          montant: number
          reference_paiement?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date_decision_investir?: string | null
          date_paiement?: string | null
          id_investissement?: number
          id_investisseur?: string | null
          id_projet?: number | null
          modified_at?: string | null
          montant?: number
          reference_paiement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_projet_id_investisseur_utilisateur"
            columns: ["id_investisseur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_projet_id_investisseur_utilisateur"
            columns: ["id_investisseur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "investissement_id_projet_fkey"
            columns: ["id_projet"]
            isOneToOne: false
            referencedRelation: "projet"
            referencedColumns: ["id_projet"]
          },
        ]
      }
      jalon: {
        Row: {
          action_a_faire: string
          created_at: string | null
          created_by: string | null
          id_culture: number
          id_jalon: number
          jours_apres_lancement: number
          modified_at: string | null
          nom_jalon: string
        }
        Insert: {
          action_a_faire: string
          created_at?: string | null
          created_by?: string | null
          id_culture: number
          id_jalon?: number
          jours_apres_lancement: number
          modified_at?: string | null
          nom_jalon: string
        }
        Update: {
          action_a_faire?: string
          created_at?: string | null
          created_by?: string | null
          id_culture?: number
          id_jalon?: number
          jours_apres_lancement?: number
          modified_at?: string | null
          nom_jalon?: string
        }
        Relationships: [
          {
            foreignKeyName: "jalon_id_culture_fkey"
            columns: ["id_culture"]
            isOneToOne: false
            referencedRelation: "culture"
            referencedColumns: ["id_culture"]
          },
        ]
      }
      message: {
        Row: {
          contenu: string
          created_at: string | null
          created_by: string | null
          date_envoi: string | null
          id_conversation: number | null
          id_destinataire: string
          id_expediteur: string
          id_message: number
          lu: boolean | null
          modified_at: string | null
        }
        Insert: {
          contenu: string
          created_at?: string | null
          created_by?: string | null
          date_envoi?: string | null
          id_conversation?: number | null
          id_destinataire: string
          id_expediteur: string
          id_message?: number
          lu?: boolean | null
          modified_at?: string | null
        }
        Update: {
          contenu?: string
          created_at?: string | null
          created_by?: string | null
          date_envoi?: string | null
          id_conversation?: number | null
          id_destinataire?: string
          id_expediteur?: string
          id_message?: number
          lu?: boolean | null
          modified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_id_conversation_fkey"
            columns: ["id_conversation"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id_conversation"]
          },
          {
            foreignKeyName: "message_id_destinataire_fkey1"
            columns: ["id_destinataire"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "message_id_destinataire_fkey1"
            columns: ["id_destinataire"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "message_id_expediteur_fkey1"
            columns: ["id_expediteur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "message_id_expediteur_fkey1"
            columns: ["id_expediteur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
        ]
      }
      projet: {
        Row: {
          created_at: string | null
          created_by: string | null
          geom: unknown | null
          id_commune: number | null
          id_district: number | null
          id_projet: number
          id_region: number | null
          id_superviseur: string | null
          id_tantsaha: string | null
          id_technicien: string | null
          id_terrain: number | null
          modified_at: string | null
          statut: string | null
          surface_ha: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          geom?: unknown | null
          id_commune?: number | null
          id_district?: number | null
          id_projet?: number
          id_region?: number | null
          id_superviseur?: string | null
          id_tantsaha?: string | null
          id_technicien?: string | null
          id_terrain?: number | null
          modified_at?: string | null
          statut?: string | null
          surface_ha: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          geom?: unknown | null
          id_commune?: number | null
          id_district?: number | null
          id_projet?: number
          id_region?: number | null
          id_superviseur?: string | null
          id_tantsaha?: string | null
          id_technicien?: string | null
          id_terrain?: number | null
          modified_at?: string | null
          statut?: string | null
          surface_ha?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_projet_id_superviseur_utilisateur"
            columns: ["id_superviseur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_projet_id_superviseur_utilisateur"
            columns: ["id_superviseur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_projet_id_tantsaha_utilisateur"
            columns: ["id_tantsaha"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_projet_id_tantsaha_utilisateur"
            columns: ["id_tantsaha"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_projet_id_technicien_utilisateur"
            columns: ["id_technicien"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_projet_id_technicien_utilisateur"
            columns: ["id_technicien"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "projet_id_commune_fkey"
            columns: ["id_commune"]
            isOneToOne: false
            referencedRelation: "commune"
            referencedColumns: ["id_commune"]
          },
          {
            foreignKeyName: "projet_id_district_fkey"
            columns: ["id_district"]
            isOneToOne: false
            referencedRelation: "district"
            referencedColumns: ["id_district"]
          },
          {
            foreignKeyName: "projet_id_region_fkey"
            columns: ["id_region"]
            isOneToOne: false
            referencedRelation: "region"
            referencedColumns: ["id_region"]
          },
          {
            foreignKeyName: "projet_id_terrain_fkey"
            columns: ["id_terrain"]
            isOneToOne: false
            referencedRelation: "terrain"
            referencedColumns: ["id_terrain"]
          },
        ]
      }
      projet_culture: {
        Row: {
          cout_exploitation_previsionnel: number | null
          cout_exploitation_reel: number | null
          created_at: string | null
          created_by: string | null
          date_debut_previsionnelle: string | null
          date_debut_reelle: string | null
          id_culture: number | null
          id_projet: number | null
          id_projet_culture: number
          modified_at: string | null
          rendement_previsionnel: number | null
          rendement_reel: number | null
        }
        Insert: {
          cout_exploitation_previsionnel?: number | null
          cout_exploitation_reel?: number | null
          created_at?: string | null
          created_by?: string | null
          date_debut_previsionnelle?: string | null
          date_debut_reelle?: string | null
          id_culture?: number | null
          id_projet?: number | null
          id_projet_culture?: number
          modified_at?: string | null
          rendement_previsionnel?: number | null
          rendement_reel?: number | null
        }
        Update: {
          cout_exploitation_previsionnel?: number | null
          cout_exploitation_reel?: number | null
          created_at?: string | null
          created_by?: string | null
          date_debut_previsionnelle?: string | null
          date_debut_reelle?: string | null
          id_culture?: number | null
          id_projet?: number | null
          id_projet_culture?: number
          modified_at?: string | null
          rendement_previsionnel?: number | null
          rendement_reel?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projet_culture_id_culture_fkey"
            columns: ["id_culture"]
            isOneToOne: false
            referencedRelation: "culture"
            referencedColumns: ["id_culture"]
          },
          {
            foreignKeyName: "projet_culture_id_projet_fkey"
            columns: ["id_projet"]
            isOneToOne: false
            referencedRelation: "projet"
            referencedColumns: ["id_projet"]
          },
        ]
      }
      projet_jalon: {
        Row: {
          created_at: string | null
          created_by: string | null
          date_previsionnelle: string
          date_reelle: string | null
          id_jalon: number
          id_projet: number
          modified_at: string | null
          photos_sur_terrain: string | null
          rapport_terrain: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date_previsionnelle: string
          date_reelle?: string | null
          id_jalon: number
          id_projet: number
          modified_at?: string | null
          photos_sur_terrain?: string | null
          rapport_terrain?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date_previsionnelle?: string
          date_reelle?: string | null
          id_jalon?: number
          id_projet?: number
          modified_at?: string | null
          photos_sur_terrain?: string | null
          rapport_terrain?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projet_jalon_id_jalon_fkey"
            columns: ["id_jalon"]
            isOneToOne: false
            referencedRelation: "jalon"
            referencedColumns: ["id_jalon"]
          },
          {
            foreignKeyName: "projet_jalon_id_projet_fkey"
            columns: ["id_projet"]
            isOneToOne: false
            referencedRelation: "projet"
            referencedColumns: ["id_projet"]
          },
        ]
      }
      province: {
        Row: {
          created_at: string | null
          emplacement_chef_lieu: string | null
          id_province: number
          nom_province: string
        }
        Insert: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_province?: number
          nom_province: string
        }
        Update: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_province?: number
          nom_province?: string
        }
        Relationships: []
      }
      region: {
        Row: {
          created_at: string | null
          emplacement_chef_lieu: string | null
          id_province: number
          id_region: number
          nom_region: string
        }
        Insert: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_province: number
          id_region?: number
          nom_region: string
        }
        Update: {
          created_at?: string | null
          emplacement_chef_lieu?: string | null
          id_province?: number
          id_region?: number
          nom_region?: string
        }
        Relationships: [
          {
            foreignKeyName: "region_id_province_fkey"
            columns: ["id_province"]
            isOneToOne: false
            referencedRelation: "province"
            referencedColumns: ["id_province"]
          },
        ]
      }
      role: {
        Row: {
          created_at: string | null
          description_role: string | null
          id_role: number
          nom_role: string
        }
        Insert: {
          created_at?: string | null
          description_role?: string | null
          id_role?: number
          nom_role: string
        }
        Update: {
          created_at?: string | null
          description_role?: string | null
          id_role?: number
          nom_role?: string
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      telephone: {
        Row: {
          created_at: string | null
          est_mobile_banking: boolean | null
          est_whatsapp: boolean | null
          id_telephone: number
          id_utilisateur: string
          modified_at: string | null
          numero: string
          type: string
        }
        Insert: {
          created_at?: string | null
          est_mobile_banking?: boolean | null
          est_whatsapp?: boolean | null
          id_telephone?: number
          id_utilisateur: string
          modified_at?: string | null
          numero: string
          type?: string
        }
        Update: {
          created_at?: string | null
          est_mobile_banking?: boolean | null
          est_whatsapp?: boolean | null
          id_telephone?: number
          id_utilisateur?: string
          modified_at?: string | null
          numero?: string
          type?: string
        }
        Relationships: []
      }
      terrain: {
        Row: {
          acces_eau: boolean | null
          acces_route: boolean | null
          archive: boolean
          created_at: string | null
          created_by: string | null
          geom: unknown | null
          id_commune: number | null
          id_district: number | null
          id_region: number | null
          id_superviseur: string | null
          id_tantsaha: string | null
          id_technicien: string | null
          id_terrain: number
          modified_at: string | null
          nom_terrain: string | null
          statut: boolean
          surface_proposee: number
          surface_validee: number | null
        }
        Insert: {
          acces_eau?: boolean | null
          acces_route?: boolean | null
          archive?: boolean
          created_at?: string | null
          created_by?: string | null
          geom?: unknown | null
          id_commune?: number | null
          id_district?: number | null
          id_region?: number | null
          id_superviseur?: string | null
          id_tantsaha?: string | null
          id_technicien?: string | null
          id_terrain?: number
          modified_at?: string | null
          nom_terrain?: string | null
          statut?: boolean
          surface_proposee: number
          surface_validee?: number | null
        }
        Update: {
          acces_eau?: boolean | null
          acces_route?: boolean | null
          archive?: boolean
          created_at?: string | null
          created_by?: string | null
          geom?: unknown | null
          id_commune?: number | null
          id_district?: number | null
          id_region?: number | null
          id_superviseur?: string | null
          id_tantsaha?: string | null
          id_technicien?: string | null
          id_terrain?: number
          modified_at?: string | null
          nom_terrain?: string | null
          statut?: boolean
          surface_proposee?: number
          surface_validee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_terrain_id_superviseur_utilisateur"
            columns: ["id_superviseur"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_terrain_id_superviseur_utilisateur"
            columns: ["id_superviseur"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_terrain_id_tantsaha_utilisateur"
            columns: ["id_tantsaha"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_terrain_id_tantsaha_utilisateur"
            columns: ["id_tantsaha"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_terrain_id_technicien_utilisateur"
            columns: ["id_technicien"]
            isOneToOne: false
            referencedRelation: "utilisateur"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "fk_terrain_id_technicien_utilisateur"
            columns: ["id_technicien"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_utilisateur"]
          },
          {
            foreignKeyName: "terrain_id_commune_fkey"
            columns: ["id_commune"]
            isOneToOne: false
            referencedRelation: "commune"
            referencedColumns: ["id_commune"]
          },
          {
            foreignKeyName: "terrain_id_district_fkey"
            columns: ["id_district"]
            isOneToOne: false
            referencedRelation: "district"
            referencedColumns: ["id_district"]
          },
          {
            foreignKeyName: "terrain_id_region_fkey"
            columns: ["id_region"]
            isOneToOne: false
            referencedRelation: "region"
            referencedColumns: ["id_region"]
          },
        ]
      }
      terrain_culture: {
        Row: {
          cout_exploitation: number | null
          created_at: string | null
          created_by: string | null
          date_derniere_culture: string | null
          id_culture: number | null
          id_terrain: number | null
          id_terrain_culture: number
          modified_at: string | null
          rendement: number | null
        }
        Insert: {
          cout_exploitation?: number | null
          created_at?: string | null
          created_by?: string | null
          date_derniere_culture?: string | null
          id_culture?: number | null
          id_terrain?: number | null
          id_terrain_culture?: number
          modified_at?: string | null
          rendement?: number | null
        }
        Update: {
          cout_exploitation?: number | null
          created_at?: string | null
          created_by?: string | null
          date_derniere_culture?: string | null
          id_culture?: number | null
          id_terrain?: number | null
          id_terrain_culture?: number
          modified_at?: string | null
          rendement?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "terrain_culture_id_culture_fkey"
            columns: ["id_culture"]
            isOneToOne: false
            referencedRelation: "culture"
            referencedColumns: ["id_culture"]
          },
          {
            foreignKeyName: "terrain_culture_id_terrain_fkey"
            columns: ["id_terrain"]
            isOneToOne: false
            referencedRelation: "terrain"
            referencedColumns: ["id_terrain"]
          },
        ]
      }
      utilisateur: {
        Row: {
          created_at: string | null
          email: string
          id_role: number | null
          id_utilisateur: string
          nom: string
          photo_couverture: string | null
          photo_profil: string | null
          prenoms: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id_role?: number | null
          id_utilisateur: string
          nom: string
          photo_couverture?: string | null
          photo_profil?: string | null
          prenoms?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id_role?: number | null
          id_utilisateur?: string
          nom?: string
          photo_couverture?: string | null
          photo_profil?: string | null
          prenoms?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateur_id_role_fkey"
            columns: ["id_role"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id_role"]
          },
          {
            foreignKeyName: "utilisateur_id_role_fkey"
            columns: ["id_role"]
            isOneToOne: false
            referencedRelation: "utilisateurs_par_role"
            referencedColumns: ["id_role"]
          },
        ]
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      utilisateurs_par_role: {
        Row: {
          email: string | null
          id_role: number | null
          id_utilisateur: string | null
          nom: string | null
          nom_role: string | null
          photo_profil: string | null
          prenoms: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: {
          oldname: string
          newname: string
          version: string
        }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: {
          tbl: unknown
          col: string
        }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: {
          tbl: unknown
          att_name: string
          geom: unknown
          mode?: string
        }
        Returns: number
      }
      _st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      _st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_intersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      _st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      _st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: {
          geom: unknown
        }
        Returns: number
      }
      _st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      addauth: {
        Args: {
          "": string
        }
        Returns: boolean
      }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
      box:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box3d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3dtobox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      bytea:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
            }
            Returns: string
          }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
            }
            Returns: string
          }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geography:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geography_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geography_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geometry_above: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geometry_below: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_cmp: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_contained_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_eq: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_ge: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_gt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_hash: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      geometry_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_le: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_left: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_lt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_overabove: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overleft: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overright: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_right: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geometry_sortsupport: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geometry_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometrytype:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: {
          "": number
        }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gidx_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      json: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      jsonb: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      point: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      polygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      populate_geometry_columns:
        | {
            Args: {
              tbl_oid: unknown
              use_typmod?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              use_typmod?: boolean
            }
            Returns: string
          }
      postgis_addbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_type: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: string
      }
      postgis_dropbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_type: {
        Args: {
          "": number
        }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      spheroid_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      spheroid_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3ddistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_3dlength: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dlongestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dperimeter: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dshortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_addpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_angle:
        | {
            Args: {
              line1: unknown
              line2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              pt1: unknown
              pt2: unknown
              pt3: unknown
              pt4?: unknown
            }
            Returns: number
          }
      st_area:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_area2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_asbinary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asencodedpolyline: {
        Args: {
          geom: unknown
          nprecision?: number
        }
        Returns: string
      }
      st_asewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_asewkt:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asgeojson:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
            Returns: string
          }
      st_asgml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
      st_ashexewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_askml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
      st_aslatlontext: {
        Args: {
          geom: unknown
          tmpl?: string
        }
        Returns: string
      }
      st_asmarc21: {
        Args: {
          geom: unknown
          format?: string
        }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
      st_astext:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_astwkb:
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: {
          geom: unknown
          maxdecimaldigits?: number
          options?: number
        }
        Returns: string
      }
      st_azimuth:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_boundary: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: {
          geom: unknown
          fits?: boolean
        }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: {
              geom: unknown
              radius: number
              options?: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              radius: number
              quadsegs: number
            }
            Returns: unknown
          }
      st_buildarea: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_centroid:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      st_cleangeometry: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: {
          geom: unknown
          box: unknown
        }
        Returns: unknown
      }
      st_closestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: {
          "": unknown[]
        }
        Returns: unknown[]
      }
      st_collect:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_collectionextract: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_convexhull: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_coorddim: {
        Args: {
          geometry: unknown
        }
        Returns: number
      }
      st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_curvetoline: {
        Args: {
          geom: unknown
          tol?: number
          toltype?: number
          flags?: number
        }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: {
          g1: unknown
          tolerance?: number
          flags?: number
        }
        Returns: unknown
      }
      st_difference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_dimension: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_disjoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_distance:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_distancesphere:
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              radius: number
            }
            Returns: number
          }
      st_distancespheroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_dump: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_envelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_expand:
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
            }
            Returns: unknown
          }
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
              dz?: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              dx: number
              dy: number
              dz?: number
              dm?: number
            }
            Returns: unknown
          }
      st_exteriorring: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force3d: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force3dm: {
        Args: {
          geom: unknown
          mvalue?: number
        }
        Returns: unknown
      }
      st_force3dz: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force4d: {
        Args: {
          geom: unknown
          zvalue?: number
          mvalue?: number
        }
        Returns: unknown
      }
      st_forcecollection: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcecurve: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcerhr: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcesfs: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_generatepoints:
        | {
            Args: {
              area: unknown
              npoints: number
            }
            Returns: unknown
          }
        | {
            Args: {
              area: unknown
              npoints: number
              seed: number
            }
            Returns: unknown
          }
      st_geogfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geohash:
        | {
            Args: {
              geog: unknown
              maxchars?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxchars?: number
            }
            Returns: string
          }
      st_geomcollfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometrytype: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromgeojson:
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
      st_geomfromgml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: {
          marc21xml: string
        }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_gmltosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_hasarc: {
        Args: {
          geometry: unknown
        }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_hexagon: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: {
          line: unknown
          point: unknown
        }
        Returns: number
      }
      st_intersection: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_intersects:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_isclosed: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_iscollection: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isempty: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isring: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_issimple: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvalid: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: {
          geom: unknown
          flags?: number
        }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_length:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_length2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_letters: {
        Args: {
          letters: string
          font?: Json
        }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: {
          txtin: string
          nprecision?: number
        }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_linemerge: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linetocurve: {
        Args: {
          geometry: unknown
        }
        Returns: unknown
      }
      st_locatealong: {
        Args: {
          geometry: unknown
          measure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: {
          geometry: unknown
          fromelevation: number
          toelevation: number
        }
        Returns: unknown
      }
      st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_m: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_makebox2d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_makeline:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_makepolygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_makevalid:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              params: string
            }
            Returns: unknown
          }
      st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: {
          inputgeom: unknown
          segs_per_quarter?: number
        }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multi: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_ndims: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_node: {
        Args: {
          g: unknown
        }
        Returns: unknown
      }
      st_normalize: {
        Args: {
          geom: unknown
        }
        Returns: unknown
      }
      st_npoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_nrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numgeometries: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorring: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpatches: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_offsetcurve: {
        Args: {
          line: unknown
          distance: number
          params?: string
        }
        Returns: unknown
      }
      st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_perimeter:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_perimeter2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_pointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_points: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonize: {
        Args: {
          "": unknown[]
        }
        Returns: unknown
      }
      st_project: {
        Args: {
          geog: unknown
          distance: number
          azimuth: number
        }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: {
          geom: unknown
          gridsize: number
        }
        Returns: unknown
      }
      st_relate: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: {
          geom: unknown
          tolerance?: number
        }
        Returns: unknown
      }
      st_reverse: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_segmentize: {
        Args: {
          geog: unknown
          max_segment_length: number
        }
        Returns: unknown
      }
      st_setsrid:
        | {
            Args: {
              geog: unknown
              srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              srid: number
            }
            Returns: unknown
          }
      st_sharedpaths: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_shortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: {
          geom: unknown
          vertex_fraction: number
          is_outer?: boolean
        }
        Returns: unknown
      }
      st_split: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_square: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_squaregrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | {
            Args: {
              geog: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom: unknown
            }
            Returns: number
          }
      st_startpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_subdivide: {
        Args: {
          geom: unknown
          maxvertices?: number
          gridsize?: number
        }
        Returns: unknown[]
      }
      st_summary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_swapordinates: {
        Args: {
          geom: unknown
          ords: unknown
        }
        Returns: unknown
      }
      st_symdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_transform:
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_proj: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              to_proj: string
            }
            Returns: unknown
          }
      st_triangulatepolygon: {
        Args: {
          g1: unknown
        }
        Returns: unknown
      }
      st_union:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              gridsize: number
            }
            Returns: unknown
          }
      st_voronoilines: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: {
          wkb: string
        }
        Returns: unknown
      }
      st_wkttosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_wrapx: {
        Args: {
          geom: unknown
          wrap: number
          move: number
        }
        Returns: unknown
      }
      st_x: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_y: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_z: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmflag: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      unlockrows: {
        Args: {
          "": string
        }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
