export class CacheLogger {
  private hits = 0;
  private misses = 0;

  hit() {
    this.hits++;
    console.log('✅ Cache HIT');
  }

  miss() {
    this.misses++;
    console.log('❌ Cache MISS');
  }

  getStats() {
    return { hits: this.hits, misses: this.misses };
  }
}
