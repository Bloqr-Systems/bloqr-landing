export type Persona = 'consumer' | 'poweruser' | 'developer' | 'vendor' | null;

class AudienceState {
  persona = $state<Persona>(null);
}

export const audienceStore = new AudienceState();
