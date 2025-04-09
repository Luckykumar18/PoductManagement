import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthProvider";
import { logoutUser } from "../../helpers/apiCommunicators";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Logout functionality with API call and reset user state
  const handleLogout = async () => {
    const res = await logoutUser();
    if (!res.error) {
      setAuthUser(null);
      navigate("/login", { replace: true });
    }
  };

  const navLinks = [
    { label: "My Products", to: "/my-products" },
    { label: "Find Products", to: "/products" },
    { label: "Create Product", to: "/create" },
  ];

  const authLink = authUser
    ? { label: "Logout", onClick: handleLogout }
    : { label: "Login", to: "/login" };

  const mobileNavItems = [...navLinks, authLink];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", pt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/logo.png" alt="Logo" height={30} />
        </Link>
      </Box>
      <List>
        {mobileNavItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={item.to ? Link : "button"}
              to={item.to ? item.to : undefined}
              onClick={item.onClick ? item.onClick : undefined}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          margin: { xs: "10px auto", sm: "15px auto" },
          border: "2px solid white",
          borderRadius: "10px",
          width: { xs: "95vw", sm: "80vw" },
          backgroundColor: "#ffffff",
          color: "black",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          height: "70px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ "&:hover": { backgroundColor: "transparent" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/logo.png" alt="Logo" height={70} width={100} />
            </Link>
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, alignItems: "center" }}>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.to}
                sx={{ color: "black", textTransform: "none", "&:hover": { backgroundColor: "transparent" } }}
              >
                {item.label}
              </Button>
            ))}
            {authUser ? (
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#ce3b3b",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  "&:hover": { backgroundColor: "#ce3b3b" },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#ce3b3b",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  "&:hover": { backgroundColor: "#ce3b3b" },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { xs: "block", sm: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: "70vw" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
