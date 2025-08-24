import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel
} from '@ionic/react';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Escape Room Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Escape Room Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="cozy-container">
          <h1 className="cozy-heading-lg cozy-m-md">Welcome to Your Cozy Escape Room Tracker</h1>
          
          {/* Demo Card with Cozy Styling */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Cozy Design System Demo</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="cozy-body-md cozy-m-sm">
                This demonstrates the warm, cozy design system with rounded corners, 
                soft shadows, and a comfortable color palette.
              </p>
              
              <div className="cozy-m-md">
                <IonButton expand="block" color="primary">
                  Primary Cozy Button
                </IonButton>
              </div>
              
              <div className="cozy-m-md">
                <IonButton expand="block" fill="outline" color="secondary">
                  Secondary Outline Button
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Demo Form Elements */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Form Elements</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="stacked">Escape Room Name</IonLabel>
                <IonInput placeholder="Enter room name..." />
              </IonItem>
              
              <IonItem>
                <IonLabel position="stacked">Store Name</IonLabel>
                <IonInput placeholder="Enter store name..." />
              </IonItem>
              
              <IonItem>
                <IonLabel position="stacked">Review Notes</IonLabel>
                <IonTextarea 
                  placeholder="Share your thoughts about this escape room..."
                  rows={4}
                />
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Custom Styled Elements */}
          <div className="cozy-card cozy-m-md">
            <h3 className="cozy-heading-sm">Custom Cozy Card</h3>
            <p className="cozy-body-md">
              This card uses custom CSS classes from our cozy design system.
              It has rounded corners, soft shadows, and warm spacing.
            </p>
            <button className="cozy-button-primary cozy-m-sm">
              Custom Cozy Button
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
