import React from "react";
import { connect } from "react-redux";

import Moment from "react-moment";

import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import CardCover from "@mui/joy/CardCover";
import CardOverflow from "@mui/joy/CardOverflow";
import Box from "@mui/joy/Box";
import Tooltip from "@mui/joy/Tooltip";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Badge from "@mui/joy/Badge";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import ForumIcon from "@mui/icons-material/Forum";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InfoIcon from "@mui/icons-material/Info";

import { TinyNumber, BannerImage } from "./Display";
import CopyLink from "./CopyLink";

import { setHomeInstance } from "../reducers/configReducer";
import { showInstanceModal } from "../reducers/modalReducer";

import InstanceAvatar from "./InstanceAvatar";
import InstanceModal from "./InstanceModal";

export default function InstanceCard({ instance, dispatch }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "350px",
        gap: 0,
      }}
    >
      {/* Header */}
      <CardOverflow
        variant="soft"
        orientation="horizontal"
        sx={{
          py: 2,
          px: 2,
          columnGap: 0,
          flexGrow: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <InstanceAvatar instance={instance} />
        </Box>

        {/* Title & Base URL */}
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            overflow: "hidden",
            mx: 1,
            // ml: 2,
          }}
        >
          <Typography
            level="body3"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              overflow: "hidden",
              whiteSpace: "nowrap",

              textOverflow: "ellipsis",
              pb: 0.5,
            }}
          >
            <Link
              level="body1"
              // variant="outlined"
              alt={instance.name}
              color="neutral"
              href={instance.url}
              target="_blank"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                textOverflow: "ellipsis",
                ml: 0.5,
              }}
            >
              {instance.name} <OpenInNewIcon fontSize={"small"} sx={{ ml: 1 }} />
            </Link>
          </Typography>

          <Typography level="body3">
            <CopyLink
              copyText={instance.url.split("/")[2]}
              linkProps={{
                variant: "plain",
                color: "neutral",
              }}
            />
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 1,
            flexGrow: 1,
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <Tooltip title="Instance Menu">
            <IconButton
              size="md"
              variant="outlined"
              color={"neutral"}
              // sx={{ ml: "auto", alignSelf: "flex-start", flexShrink: 1 }}
              onClick={() => {
                dispatch(showInstanceModal(instance));
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardOverflow>

      {/* Banner */}
      <CardOverflow
        sx={() => ({
          background: "linear-gradient(15deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
          p: 0,
          minHeight: "125px",
          maxHeight: "150px",
          overflow: "hidden",
          borderRadius: 0,
        })}
      >
        <BannerImage imageSrc={instance.banner || false} />
        <Divider inset="context" />
      </CardOverflow>

      {/* Description */}
      <CardContent
        orientation="horizontal"
        sx={{
          py: 1,
        }}
      >
        <Typography
          level="body3"
          sx={{
            maxHeight: "90px",
            overflow: "hidden",
          }}
        >
          {instance.desc}
        </Typography>
      </CardContent>

      {/* Stats */}
      <CardOverflow
        variant="soft"
        sx={{
          bgcolor: "background.level1",
        }}
      >
        <Divider inset="context" />
        <CardContent
          orientation="horizontal"
          sx={{
            justifyContent: "space-around",
          }}
        >
          <Tooltip title="Total Users" variant="soft">
            <Typography
              level="body3"
              fontWeight="md"
              textColor="text.secondary"
              sx={{
                cursor: "default",
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 0.5,
              }}
            >
              <PersonIcon />
              <TinyNumber value={instance.usage.users.total} />
            </Typography>
          </Tooltip>
          <Divider orientation="vertical" />
          <Tooltip title="Posts" variant="soft">
            <Typography
              level="body3"
              fontWeight="md"
              textColor="text.secondary"
              sx={{
                cursor: "default",
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 0.5,
              }}
            >
              <MessageIcon />
              <TinyNumber value={instance.usage.localPosts} />
            </Typography>
          </Tooltip>
          <Divider orientation="vertical" />
          <Tooltip title="Comments" variant="soft">
            <Typography
              level="body3"
              fontWeight="md"
              textColor="text.secondary"
              sx={{
                cursor: "default",
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 0.5,
              }}
            >
              <ForumIcon />
              <TinyNumber value={instance.usage.localComments} />
            </Typography>
          </Tooltip>
          <Divider orientation="vertical" />

          <Tooltip
            title={
              <>
                Uptime{" "}
                {instance.uptime?.uptime_alltime ? (
                  <>
                    (First seen <Moment fromNow>{instance.uptime?.date_created}</Moment>)
                  </>
                ) : (
                  <>(Unknown instance)</>
                )}
              </>
            }
            variant="soft"
          >
            <Typography
              level="body3"
              fontWeight="md"
              textColor="text.secondary"
              sx={{
                cursor: "default",
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 0.5,
              }}
            >
              {instance.uptime?.uptime_alltime && (
                <>
                  <TrendingUpIcon />
                  {instance.uptime?.uptime_alltime}%
                </>
              )}

              {!instance.uptime?.uptime_alltime && (
                <>
                  <ThumbDownIcon />
                </>
              )}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
