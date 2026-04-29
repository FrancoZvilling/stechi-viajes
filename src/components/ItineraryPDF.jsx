import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logoImg from '../assets/logo-navbar.jpg';

// Registrar fuente base si fuera necesario o usar fuentes por defecto del sistema
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 70,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #3B82F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15
  },
  logo: {
    width: 120,
    height: 50,
    objectFit: 'contain'
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 20
  },
  title: {
    fontSize: 22,
    color: '#0F172A',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  decorativeBar: {
    height: 4,
    backgroundColor: '#3B82F6',
    width: '100%',
    marginBottom: 20,
    marginTop: -5
  },
  sectionTitle: {
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 15,
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#334155',
    textAlign: 'justify',
    marginBottom: 8
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderTop: '1px solid #E2E8F0',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 6
  },
  pageNumber: {
    fontSize: 9,
    color: '#94A3B8',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  watermark: {
    position: 'absolute',
    top: '35%',
    left: '15%',
    opacity: 0.04,
    width: '70%',
    transform: 'rotate(-30deg)'
  }
});

const ItineraryPDF = ({ pkg }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        
        {/* Marca de Agua decorativa */}
        <Image src={logoImg} style={styles.watermark} fixed />

        {/* Header Superior (Título e Info principal) */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{pkg.title}</Text>
            <Text style={styles.subtitle}>{pkg.continent} - {pkg.country} | Viaje tipo {pkg.type}</Text>
          </View>
          <Image src={logoImg} style={styles.logo} />
        </View>

        {/* Cuerpo del Itinerario fluyendo naturalmente */}
        <Text style={styles.sectionTitle}>✈️ ITINERARIO OFICIAL DEL VIAJE</Text>
        
        {pkg.itineraryText ? (() => {
          // Limpieza de texto para unir líneas cortadas por copy-paste
          // Une una línea con la siguiente si la siguiente empieza con minúscula (indicando que es parte de la misma oración)
          const cleanedText = pkg.itineraryText.replace(/\n([a-záéíóúñü])/g, ' $1');
          
          return cleanedText.split('\n').map((paragraph, index) => (
            paragraph.trim() !== '' ? (
              <Text key={index} style={styles.paragraph}>
                {paragraph.trim()}
              </Text>
            ) : <Text key={index} style={{ marginBottom: 8 }} />
          ));
        })() : (
          <Text style={styles.paragraph}>
            El itinerario de este viaje se encuentra en preparación por uno de nuestros asesores.
          </Text>
        )}

        {/* Pie de Página (Mismo en todas) */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Documento generado por Stechi Viajes. Los servicios e itinerarios descritos están sujetos a disponibilidad comercial y variaciones climáticas u operativas. Por cualquier consulta contáctese con su asesor de confianza.
          </Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </View>

      </Page>
    </Document>
  );
};

export default ItineraryPDF;
