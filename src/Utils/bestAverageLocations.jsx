import React from 'react';

// K-Means clustering for accidentData
export function findBestAverageLocations(accidentData, x = 3, maxIterations = 100) {
  if (!accidentData.length || x <= 0) return [];

  // Convert accidentData to [lng, lat] array
  const points = accidentData.map(d => d.COORDINATES);

  // Randomly initialize centroids
  let centroids = points.slice(0, x);

  for (let iter = 0; iter < maxIterations; iter++) {
    // Assign each point to nearest centroid
    const clusters = Array.from({ length: x }, () => []);
    points.forEach(pt => {
      let minDist = Infinity, minIdx = 0;
      centroids.forEach((c, idx) => {
        const dist = Math.hypot(pt[0] - c[0], pt[1] - c[1]);
        if (dist < minDist) {
          minDist = dist;
          minIdx = idx;
        }
      });
      clusters[minIdx].push(pt);
    });

    // Update centroids to mean of clusters
    centroids = clusters.map(cluster => {
      if (!cluster.length) return [0, 0];
      const sum = cluster.reduce((acc, pt) => [acc[0] + pt[0], acc[1] + pt[1]], [0, 0]);
      return [sum[0] / cluster.length, sum[1] / cluster.length];
    });
  }

  // Return centroids as best average locations
  return centroids.map(([lng, lat]) => ({ lng, lat }));
}

