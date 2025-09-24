import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, MousePointer, Clock, Users, Globe, Activity, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface AnalyticsData {
  liveVisitors: number;
  pageViews: number;
  interactionRate: number;
  avgLoadTime: number;
  bounce: number;
  sessions: number;
  countries: number;
  uptime: number;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>({
    liveVisitors: 0,
    pageViews: 0,
    interactionRate: 0,
    avgLoadTime: 0,
    bounce: 0,
    sessions: 0,
    countries: 0,
    uptime: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
      observer.observe(analyticsSection);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const targetData = {
      liveVisitors: 1247,
      pageViews: 8924,
      interactionRate: 94.7,
      avgLoadTime: 0.8,
      bounce: 23.5,
      sessions: 2340,
      countries: 67,
      uptime: 99.9
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setData({
        liveVisitors: Math.floor(targetData.liveVisitors * progress),
        pageViews: Math.floor(targetData.pageViews * progress),
        interactionRate: parseFloat((targetData.interactionRate * progress).toFixed(1)),
        avgLoadTime: parseFloat((targetData.avgLoadTime * progress).toFixed(1)),
        bounce: parseFloat((targetData.bounce * progress).toFixed(1)),
        sessions: Math.floor(targetData.sessions * progress),
        countries: Math.floor(targetData.countries * progress),
        uptime: parseFloat((targetData.uptime * progress).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(timer);
        setData(targetData);
      }
    }, interval);
  };

  return (
    <section id="analytics" className="py-20 bg-muted/20" data-testid="analytics-section">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16" data-testid="analytics-title">
          Real-time <span className="gradient-text">Analytics</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Live Visitors */}
          <Card className="analytics-card" data-testid="card-live-visitors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Live Visitors</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.liveVisitors.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">+12% from yesterday</div>
            </CardContent>
          </Card>

          {/* Page Views */}
          <Card className="analytics-card" data-testid="card-page-views">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Page Views</h3>
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.pageViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">+5.2% this week</div>
            </CardContent>
          </Card>

          {/* Interaction Rate */}
          <Card className="analytics-card" data-testid="card-interaction-rate">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Interaction Rate</h3>
                <MousePointer className="h-5 w-5 text-accent" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.interactionRate}%</div>
              <div className="text-sm text-muted-foreground">Highly engaging</div>
            </CardContent>
          </Card>

          {/* Load Time */}
          <Card className="analytics-card" data-testid="card-load-time">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Avg Load Time</h3>
                <Clock className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.avgLoadTime}s</div>
              <div className="text-sm text-muted-foreground">Optimized performance</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="analytics-card" data-testid="card-bounce-rate">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Bounce Rate</h3>
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.bounce}%</div>
              <div className="text-sm text-muted-foreground">Low bounce rate</div>
            </CardContent>
          </Card>

          <Card className="analytics-card" data-testid="card-sessions">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Sessions</h3>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.sessions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active sessions</div>
            </CardContent>
          </Card>

          <Card className="analytics-card" data-testid="card-countries">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Countries</h3>
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.countries}</div>
              <div className="text-sm text-muted-foreground">Global reach</div>
            </CardContent>
          </Card>

          <Card className="analytics-card" data-testid="card-uptime">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Uptime</h3>
                <Zap className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{data.uptime}%</div>
              <div className="text-sm text-muted-foreground">Reliable service</div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Visualization */}
        <Card className="analytics-card" data-testid="traffic-visualization">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6">Live Traffic Visualization</h3>
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-16 w-16 text-primary mb-4 floating-element mx-auto" />
                <p className="text-lg font-medium">Real-time Analytics Dashboard</p>
                <p className="text-sm text-muted-foreground mt-2">Interactive D3.js Visualizations</p>
                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">WebSockets</Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">D3.js</Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-500">Real-time</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
