// styles.ts (สำหรับ ProductHeader)
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  
  menuIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    maxWidth: width - 120, // Ensure title doesn't overflow
  },
  
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  
  profileIcon: {
    fontSize: 18,
  },
  
  // Search and Filter styles - Updated for better responsiveness
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    gap: 8,
  },
  
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    maxWidth: '100%', // Ensure it doesn't overflow
  },
  
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#6c757d',
  },
  
  searchInput: {
    flex: 1,
    fontSize: 14, // Slightly smaller for better fit
    color: '#212529',
    paddingVertical: 0,
    maxWidth: '80%', // Prevent text overflow
  },
  
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 80, // Reduced minimum width
  },
  
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  filterButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    minWidth: 60, // Reduced minimum width
  },
  
  filterText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: '500',
  },

  // Media queries for different screen sizes
  '@media (max-width: 400px)': {
    searchContainer: {
      flexDirection: 'column',
      gap: 12,
      alignItems: 'stretch', // Ensure children take full width
    },
    searchBar: {
      width: '100%',
    },
    actionButtonsContainer: {
      width: '100%',
      justifyContent: 'space-between',
    },
    addButton: {
      flex: 1,
    },
    filterButton: {
      flex: 1,
    }
  }
});