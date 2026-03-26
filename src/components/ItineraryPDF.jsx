import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logoImg from '../assets/logo-navbar.jpg';

// Registrar fuente base si fuera necesario o usar fuentes por defecto del sistema
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
  page: {
    paddingTop: 110,
    paddingBottom: 70,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F172A',
    padding: 20,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '5px solid #3B82F6'
  },
  logo: {
    width: 140,
    height: 60,
    objectFit: 'contain',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 20
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 12,
    color: '#93C5FD',
    marginTop: 5,
    textTransform: 'uppercase'
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
    top: '30%',
    left: '10%',
    opacity: 0.03,
    width: '80%',
    transform: 'rotate(-45deg)'
  }
});

const ItineraryPDF = ({ pkg }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        
        {/* Header (Mismo en todas las páginas) */}
        <View style={styles.header} fixed>
          <Image src={logoImg} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{pkg.title}</Text>
            <Text style={styles.subtitle}>{pkg.continent} - {pkg.country} | Viaje tipo {pkg.type}</Text>
          </View>
        </View>

        <Image src={logoImg} style={styles.watermark} fixed />

        {/* Cuerpo del Itinerario fluyendo naturalmente */}
        <Text style={styles.sectionTitle}>✈️ ITINERARIO OFICIAL DEL VIAJE</Text>
        
        {pkg.itineraryText ? (
          pkg.itineraryText.split('\n').map((paragraph, index) => (
            paragraph.trim() !== '' ? (
              <Text key={index} style={styles.paragraph}>
                {paragraph}
              </Text>
            ) : <Text key={index} style={{ marginBottom: 8 }} />
          ))
        ) : (
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
