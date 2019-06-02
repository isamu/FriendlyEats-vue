export default {

  setUser(state, user) {
    const st = state;
    st.user = user;
    st.logined = true;
    st.user_loading = false;
  }
}
