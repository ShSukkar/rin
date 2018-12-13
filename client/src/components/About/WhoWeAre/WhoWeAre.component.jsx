import React from "react";
import "./WhoWeAre.css";
import Team from "../Team/Team.component";
import TeamInfo from "../team.json";
import SteeringInfo from "../steering.json";
import { Typography, Paper, Card } from "@material-ui/core";

export default props => {
  setTimeout(() => {
    document.body.scrollTo(0, window.innerHeight);
  }, 200);
  return (
    <div className="who-we-are fadeInFast">
      <section>
        <Typography variant="h3" className="color-4 upper text-center">
          <i className="fas fa-users start-icon color-2" />
          Who We Are
        </Typography>
        <Typography variant="h6" className="capitalize color-3 text-center">
          A commitment to courageous action, innovative economic solutions, and
          deep collaboration.
        </Typography>

        <div className="grid-2">
          <Paper className="margin-20">
            <Typography variant="h6" className="upper color-1 bg-2 padding-20">
              <i className="start-icon fas fa-users-cog" />
              Operating Team
            </Typography>
            <Typography variant="body1" className="padding-20">
              RIN Members represent the full capital continuum: foundations and
              philanthropists, impact, institutional, and commercial
              investors--as well as international finance institutions,
              policymakers, and humanitarians. RIN members all share a
              commitment to courageous action, innovative economic solutions,
              and deep collaboration.
            </Typography>
          </Paper>
          <Paper className="margin-20">
            <Typography variant="h6" className="upper color-1 bg-2 padding-20">
              <i className="start-icon fas fa-user-friends" />
              Key Partners
            </Typography>
            <Typography variant="body1" className="padding-20">
              Systems entrepreneurs John Kluge (Alight Fund & Toilet Hackers)
              and Tim Docking (IBM & Millennium Challenge Corporation) lead the
              RIN with support from the Global Development Incubator (GDI), a
              non-profit that builds startups and partnerships to address global
              development challenges. GDI’s Founder and Executive Director
              Andrew Stern leads the organization’s strategic and operational
              support for the RIN.
            </Typography>
          </Paper>
        </div>
        <Typography variant="h5" className="color-2">
          <i className="start-icon fas fa-users" />
          Meet The Team
        </Typography>
        <Team info={TeamInfo} />
      </section>
      <section>
        <Typography variant="h5" className="color-2">
          <i className="start-icon fas fa-user-friends" />
          Guided by a world-class Steering Committee.
        </Typography>
        <Typography variant="body1">
          We're proud to draw on the expertise of a Steering Committee made up
          of members who come from diverse backgrounds but share a commitment to
          creating long-term solutions to global forced migration.
        </Typography>
        <Team info={SteeringInfo} />
      </section>
    </div>
  );
};
