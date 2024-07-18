import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  //general components
  addButtonContainer: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginBottom: 13,
    marginRight: 0
  },
  //login components
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  generalContainer: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 10
  },
  //account components
  accountName: {
    fontSize: 18,
    color: colors.white
  },
  accountItem: {
    backgroundColor: colors.agave,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: colors.agave,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    color: colors.grey,
  },
  header: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: colors.darkeragave,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: colors.agave,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    placeholderColor: colors.lightgreen,
  },
  button: {
    backgroundColor: colors.agave,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Add margin top to the login button
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,  // Adjust size to make it circular
    height: 55, // Adjust size to make it circular
    borderRadius: 55, // Half of the width and height to make it circular
    backgroundColor: colors.agave, // Example background color
  },
  roundButtonText: {
    color: "white",
    fontSize: 25,
    // fontWeight: 'bold',
  },
  buttonText: {
    color: colors.grey,
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    padding: 20,
  },
  error: {
    color: colors.red,
    marginBottom: 10,
  },
  link: {
    color: colors.blue,
  },
  linkText: {
    color: colors.grey,
    marginBottom: 10,
    marginTop: 20, // Add margin top to the sign-up link
  },
  formContainer: {
    width: '100%',
  },
  loader: {
    marginTop: 20,
  },
  //expense screen components
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    color: colors.darkeragave
  },
  expenseDatePicker: {
    color: colors.darkeragave,
    fontSize: 18
  },
  expenseViewContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
      flex: 1,
  },
  expenseName: {
    color: colors.grey,
      fontSize: 16,
      fontWeight: 'bold',
  },
  expenseAmount: {
      fontSize: 16,
      color: colors.darkeragave,
  },
  expenseType: {
      fontSize: 14,
      color: colors.agave,
      
  },
  expenseSectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: colors.darkeragave
  },
  expenseSectionHeaderText: {
      fontSize: 15,
      fontWeight: 'bold',
  },
});

export default styles;
