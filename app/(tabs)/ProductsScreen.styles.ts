import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // ===== Container =====
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },

  // ===== Header =====
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    fontWeight: 'bold',
    fontSize: 17,
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
    maxWidth: width - 120,
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

  // ===== Search & Action Buttons =====
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
    maxWidth: '100%',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#6c757d',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
    paddingVertical: 0,
    maxWidth: '80%',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 80,
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
    minWidth: 60,
  },
  filterText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: '500',
  },

  // ===== Error =====
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  // ===== Product List =====
  productList: {
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  statusButton: {
    flexDirection: 'row',
    backgroundColor: '#7C3AED',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  statusButtonDiscontinued: {
    backgroundColor: '#9CA3AF',
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  statusTextDiscontinued: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  arrowIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
    marginTop: -1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});
