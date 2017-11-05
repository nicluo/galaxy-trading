/**
 * Resources class is a map of resources
 * It keeps track of newly-added resources
 * It allows queries to be made to convert between resource quantities
 */
class Resources {
  constructor() {
    this.resources = [];
    this.resourceMap = {};
  }

  /**
   * getResourcesList returns an array of unique resource names
   * @returns {Array}
   */
  getResourcesList() {
    return this.resources;
  }

  /**
   * AddResource initializes new resources name and skips existing names
   * @param resource
   */
  addResource(resource) {
    const resourceLower = resource.toLowerCase();
    if(this.resources.indexOf(resourceLower) === -1) {
      this.resources.push(resourceLower);
      this.resourceMap[resourceLower] = {
        label: resource, // Label stored for display when querying for transitive closures
        relations: {}
      };
      this.resourceMap[resourceLower].relations[resourceLower] = 1; // Id relation
    }
  }

  /**
   * AddResourceRelation adds a direct relation from one resource to another
   * A two-way relation is added
   * @param fromAmount
   * @param fromResource
   * @param toAmount
   * @param toResource
   */
  addResourceRelation(fromAmount, fromResource, toAmount, toResource) {
    fromResource = fromResource.toLowerCase();
    toResource = toResource.toLowerCase();
    this.resourceMap[fromResource].relations[toResource] = toAmount / fromAmount;
    this.resourceMap[toResource].relations[fromResource] = fromAmount / toAmount;
  }

  /**
   * queryRelation calculates the amount of another resource
   * @param fromAmount
   * @param fromResource
   * @param toResource
   * @returns [{resource:string, amount:number}]
   */
  queryRelation(fromAmount, fromResource, toResource) {
    const fromResourceLower = fromResource.toLowerCase();
    const toResourceLower = toResource.toLowerCase();

    const path = this.findRelationPath(fromResource, toResource);

    if(path !== null){
      const conversions = [];
      conversions.push({resource: fromResource, amount: fromAmount});

      let amount = fromAmount, previousResource = fromResourceLower;
      path.forEach(step => {
        amount = amount * this.resourceMap[previousResource].relations[step];
        conversions.push({
          resource: step === toResourceLower ? toResource : this.resourceMap[step].label,
          amount: amount
        });
        previousResource = step;
      });

      return conversions;
    } else {
      return null;
    }
  }

  /**
   * findRelationPath runs a Breadth-first search to find a shortest conversion path from fromResource to toResource
   * In the case of multiple paths with the same length, an arbitrary one is used, however, a consistent system should
   * only have one path from any resource to another.
   * @param fromResource
   * @param toResource
   * @returns {Array}
   */
  findRelationPath(fromResource, toResource) {
    fromResource = fromResource.toLowerCase();
    toResource = toResource.toLowerCase();

    const visited = {fromResource: null}; // Keeps track of visited and backtracking origin
    const next = [fromResource];
    let step;
    while (next.length > 0) {
      step = next.shift();
      Object.keys(this.resourceMap[step].relations).forEach(r => {
        if(typeof(visited[r]) === 'undefined') {
          visited[r] = step;
          next.push(r);
        }
      });
      if(visited[toResource] !== 'undefined') break; // Break early if solution is reached
    }

    // Begin backtrack
    if(typeof(visited[toResource]) !== 'undefined') {
      const path = [toResource];
      let backtrack = toResource;
      while(visited[backtrack] !== fromResource) {
        backtrack = visited[backtrack];
        path.push(backtrack);
      }
      path.reverse();
      return path;
    } else {
      return null;
    }
  }
}

export default Resources;